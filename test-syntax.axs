// Test file for NetLinx syntax highlighting

/*
 * Block comments should be highlighted correctly
 */

PROGRAM_NAME='TestHighlighting'

// Device definitions
DEFINE_DEVICE
dvTP = 10001:1:0    // device:port:system
vdvTest = 33001:1:0

// Constants
DEFINE_CONSTANT
INTEGER MY_CONSTANT = 42
CHAR MY_STRING[] = 'This is a test'

// Variables 
DEFINE_VARIABLE
VOLATILE INTEGER nCounter
CHAR cBuffer[100]

define_function

// Function without return type
DEFINE_FUNCTION TestFunction1()
{
	STACK_VAR INTEGER local_var
	local_var = 10
	
	// Test function call highlighting
	SomeOtherFunction(local_var, 'Test string')
}

// Function with return type
DEFINE_FUNCTION CHAR[100] TestFunction2(INTEGER param1, CHAR param2[])
{
	STACK_VAR CHAR result[100]
	
	IF (param1 > 5 AND param1 < 10)
	{
		result = "Parameter is between 5 and 10"
	}
	ELSE
	{
		result = "Parameter is out of range"
	}
	
	RETURN result
}

// Event handlers
DEFINE_EVENT
DATA_EVENT[dvTP]
{
	ONLINE:
	{
		SEND_COMMAND dvTP, "'^TXT-1,0,Starting up...'"
	}
}

BUTTON_EVENT[dvTP, 1]
{
	PUSH:
	{
		TO[vdvTest, 1]
		TestFunction1()
	}
}


