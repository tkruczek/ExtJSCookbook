set extDocJarFile="c:\ext-doc\ext-doc.jar"
set extDocXMLFile="c:\Users\tkruczek\Documents\_AptanaWorkspace\ExtJs\_documentation.xml"
set extDocTemplate="c:\ext-doc\template\ext\template.xml"
set outputFolder="c:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps\TwitterPipe"
java -jar %extDocJarFile% -p %extDocXMLFile% -o %outputFolder% -t %extDocTemplate%  -verbose