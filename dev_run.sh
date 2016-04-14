#!/bin/sh
gulp 'build'
ln -s ../../.. examples/todo/node_modules/angular2-meteor-universal
cd examples/todo
meteor
