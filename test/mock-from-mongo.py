#!/usr/bin/env python

'''Generate mock data using existing MongoDB collections.
Exports collections using mongoexport and places json files at app/mongomock
'''

import json
import os
import shutil
import subprocess
import tempfile

DB_NAME = 'coffee-faker'
COLLECTIONS = ['users', 'matches']

def recurse_dict(_dict, func):
    '''Recurse through a dictionary and apply func to each nested dict
    '''
    for k, v in _dict.iteritems():
        if isinstance(v, dict):
            recurse_dict(v, func)
        elif isinstance(v, list):
            for l in v:
                if isinstance(l, dict):
                    recurse_dict(l, func)
    func(_dict)

def convert_oids(collection):
    '''Iterate through a collection list and convert $oid to _id
    '''

    def _id_check(_dict):
        for k in [key for key in _dict if key.lower().endswith('id')]:
            if '_id' in _dict[k]:
                # retain original id key, e.g. 'matchedUserId'
                _dict[k] = _dict[k]['_id']
            elif k == '$oid':
                _dict['_id'] = _dict[k]
                del _dict['$oid']

    for item in collection:
        recurse_dict(item, _id_check)
    return collection

def make_mock(collection, dest):

    # Create a temp dir for the export file
    tmpdir = tempfile.mkdtemp()
    exportfile = os.path.join(tmpdir, 'out')

    subprocess.call(['mongoexport', '--db', DB_NAME, '--collection',
        collection, '--out', exportfile])

    with open(exportfile) as f:
        t = f.readlines();

    s = '[%s]' % ','.join([l.strip() for l in t])

    converted = convert_oids(json.loads(s))
    with open(os.path.join(dest, '%s.json' % collection), 'w') as f:
        json.dump(converted, f, indent=2)

    # Cleanup the temp dir
    shutil.rmtree(tmpdir)

def make_auth_mock(dest):

    with open(os.path.join(dest, 'users.json')) as f:
        users = json.load(f)

    auth = {
        'authenticated': True,
        'user': users[0]
    }

    with open(os.path.join(dest, 'auth.json'), 'w') as f:
        json.dump(auth, f, indent=2)

if __name__ == '__main__':

    # Find the app/ directory
    dest = os.path.dirname(os.path.abspath(__file__))
    while 'app' not in os.listdir(dest):
        dest = os.path.dirname(dest)
    dest = os.path.join(dest, 'app', 'mongomock')

    # Create the app/mongomock directory
    if os.path.exists(dest):
        shutil.rmtree(dest)
    os.mkdir(dest)

    for collection in COLLECTIONS:
        make_mock(collection, dest)

    make_auth_mock(dest)
