#!/bin/sh
mv -f .node_modules node_modules
gulp 'build'
mv -f node_modules .node_modules
cd examples/app
linklocal
meteor
