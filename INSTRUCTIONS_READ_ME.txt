How to run the project:
Run the index.html page and check the project out.
In order to compile the whole project please run the "GRUNT" command from command line within the project folder.  


Project behaviours:
The Weather app shows the weather condition in London as default city. 
It shows city name, an icon indicating current weather, a brief weather description, current temperature, min/max temperatures, humidity level and wind speed,
It allows to look for any other city to check its weather condition.
It allows to manually refresh the page and it also refresh itself automatically every 2 minutes.
The app background colour changes accordingly to the temperature range of each city.
I've created 5 temperature range: very-hot, hot, mild, cold, very-cold.


Project tech setup:
The project has been implemented in Google Chrome, Firefox and Safari. It is fully responsive - mobile version availale.
Also, the test is IE compatible. IE9(included) onwards.

I've used AngularJS, JavaScript, SASS, CSS3,s HTML5 and GRUNT as JS task runner. 
Naming convention followed are BEM, OOCSS and SMACCS.



IMPORTANT NOTE: Chrome doesn't support cross origin requests as I'm importing a file from a local folder within the project itself.
Therefore, in order to show the page correctly in Chrome, please load the project on a web server.