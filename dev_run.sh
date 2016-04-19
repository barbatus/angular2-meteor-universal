#!/bin/sh
mv -f node_modules_ node_modules
gulp 'build'
mv -f node_modules node_modules_
cd examples/app
linklocal
meteor
