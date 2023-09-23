# WPU_CS4800

**Backend Tools You will need:**
IDE: Intellij Ultimate
Database Client: DB Beaver

**Backend Tootls You will need:**
IDE Intellij Ultimate

**Backend Technology:**
JDK 17
SpringBoot 3.1.3
Apache Maven 3.9.4
Tomcat 10
MySQL Database

**Frontend Technology:**
Angular 16.2.0
nodeJs 18.18.0
ngx-toastr 17.0.2

**Setup your environment variables like this:**
CATALINA_HOME
D:\Apache Tomcat 10.1.13
JAVA_HOME
C:\Java\JDK 17
MAVEN_HOME
D:\devtools\apache-maven-3.9.4

**Path:**
%MAVEN_HOME%\bin
%JAVA_HOME%\bin
%CATALINA_HOME%\bin

**Setting UP database:**
Here are the contents of the application.properties file
  server.port=8088
  spring.datasource.url=jdbc:mysql://localhost:3306/wpu_cs4800_db?useSSL=false&useUnicode=yes&characterEncoding=UTF-8&serverTimezone=UTC
  spring.datasource.username=your user name
  spring.datasource.password=your password
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
  logging.level.org.springframework=INFO
  logging.level.com.example.productwebsite=DEBUG
  logging.level.org.springframework.web=DEBUG

So make sure you have a database created in MYSQL using the DB Beaver client.
You can setup the database name as: wpu_cs4800_d 
