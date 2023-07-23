#!/usr/bin/sh

# create a directory for reports
mkdir -p ./reports

# create an array of tests names
tests=(
	setup
)

# create an array of scenarios
scenarios=(
	# shared
	# time
	# constant
	ramp
)

# for each test, run each scenario
for test in "${tests[@]}"
do
	for scenario in "${scenarios[@]}"
	do
		echo "Running test: $test with scenario: $scenario"
		TEST=$test SCENARIOS=$scenario docker-compose -p k6 up k6 --no-log-prefix > ./reports/$test-$scenario.txt
		sleep 5
	done
done
