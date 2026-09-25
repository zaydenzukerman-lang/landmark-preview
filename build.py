#!/usr/bin/env python3
"""Assemble index.html from template.html + parts/ (map css/html/js) + parts/map.json (world map paths)."""
import json
t=open('template.html').read()
m=json.load(open('parts/map.json'))
html=open('parts/map.html').read().replace('__LAND__',m['land']).replace('__BORDERS__',m['borders'])
t=t.replace('/*__MAPCSS__*/',open('parts/map.css').read()).replace('<!--__MAPHTML__-->',html).replace('/*__MAPJS__*/',open('parts/map.js').read())
open('index.html','w').write(t)
print('index.html', len(t)//1024, 'KB')
