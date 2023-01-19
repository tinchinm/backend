curl -X get 'localhost:8080/infocl'

artillery quick --count 50 -n 20 "http://localhost:8080/infocl" > result_console_log.txt