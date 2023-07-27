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
		# sleep if the test is not the first one
		if [ "$test" != "${tests[0]}" ]
		then
			sleep 300
		fi
		echo "Running test: $test with scenario: $scenario"
		TEST=$test SCENARIOS=$scenario LOG_FILE=$(date +%F_%H-%M-%S) docker-compose -p k6 up k6 --no-log-prefix > ./reports/$test-$scenario.txt
	done
done
