#!/bin/bash

today=$(date +%d)

echo "-- Dag $today --"

if [ $# -gt 0 ] && [ $1 = "test" ] 
then
    input="data/$today-ex.txt"
else
    input="data/$today-input.txt"
fi
node "$today.js" $input
echo
