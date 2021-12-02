#!/bin/bash

for day in {01..25}; do
    exe=$day.js
    if [ $# -gt 0 ] && [ $1 = "test" ] 
    then
        input="data/$day-ex.txt"
    else
        input="data/$day-in.txt"
    fi
    if test -f "$exe"; then
        echo "-- Dag $day --"
        node $exe $input
        echo
    fi
done
