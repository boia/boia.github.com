---
layout: post
title: "Arduino链接yeelink实现物联网"
date: 2013-03-08 19:55
comments: true
categories: Arduino 物联网
---

## Arduino

Arduino Mega2560买来也将近一个多月了，一直放着没用，昨天想着试试Ethernet Shield，将Arduino作为一个服务器，在浏览器上可以控制Arduino，本来想着也不是太难，但自己真正搞起来了就不是那么一回事了。
<br>

{% img /images/post/ethernet.png 320 240 Arduino Yeelink %}
<!-- more -->
<br>
### 搭建局域网

先不连到网络，来搭建一个局域网，将本机和Arduino用网线连起来(用路由器的自动获取IP应该更简单一点)，


### 下载程序配置

昨天在Windows XP下找驱动，发现在网上到处找不到，今天上午就在Arduino软件下(我用的是Arduino1.0.3)看到了Drivers文件夹，这让我情何以堪啊，不过需要注意的是在设备管理器下更新驱动程序选择文件夹最好选drivers而不是FTDI USB Drivers。

接着烧程序，因为官方写了Ethernet程序库，所以我就随便选了个，打开`File/Examples/Ethernet/WebServe`文件，然后将程序中的
```
IPAddress ip(192,168,1, 177);
```
改成你本机IP的同一段

打开浏览器输入`http://192.168.1.177`，注意**输入的是你设置的IP**，简单的WebServer就搭建起来了


### Yeelink

早就听说**物联网**这个词了，却一直没有真正地去探索
接入Yeelink平台, 并通过应用进行远程管理和控制, 使您的设备快速迈进物联网时代。

[快速开始]("http://www.yeelink.net/develop/quickstart")这里有关于yeelink用户注册，新建设备，加传感器初级教程，这里就不细说了。

{% codeblock yeelink%}
 /*
 Yeelink sensor client power switch example
 */

#include <SPI.h>
#include <Ethernet.h>
#include <Wire.h>
#include <math.h>

byte buff[2];

// for yeelink api
#define APIKEY         "*****" // replace your yeelink api key here
#define DEVICEID        // replace your device ID
#define SENSORID        // replace your sensor ID

// assign a MAC address for the ethernet controller.
byte mac[] = { 0x00, 0x1D, 0x72, 0x82, 0x35, 0x9D};
// initialize the library instance:
EthernetClient client;
char server[] = "api.yeelink.net";   // name address for yeelink API

unsigned long lastConnectionTime = 0;          // last time you connected to the server, in milliseconds
boolean lastConnected = false;                 // state of the connection last time through the main loop
const unsigned long postingInterval = 3*1000; // delay between 2 datapoints, 30s
String returnValue = ""; 
boolean ResponseBegin = false;

void setup() {
  pinMode(7, OUTPUT);

  Wire.begin();
  // start serial port:
  Serial.begin(57600);
  // start the Ethernet connection with DHCP:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    for(;;)
      ;
  }
  else {
    Serial.println("Ethernet configuration OK");
  }
}

void loop() {
  // if there's incoming data from the net connection.
  // send it out the serial port.  This is for debugging
  // purposes only:

  if (client.available()) {
    char c = client.read();
   // Serial.print(c);
      if (c == '{')
        ResponseBegin = true;
      else if (c == '}')
        ResponseBegin = false;

      if (ResponseBegin)
        returnValue += c;   
  }
  if (returnValue.length() !=0 && (ResponseBegin == false))
  {
    Serial.println(returnValue);
    
    if (returnValue.charAt(returnValue.length() - 1) == '1') {
      Serial.println("turn on the LED"); 
      digitalWrite(7, HIGH);

    } 
      else if(returnValue.charAt(returnValue.length() - 1) == '0') {
      Serial.println("turn off the LED"); 
      digitalWrite(7, LOW);
    }
     returnValue = "";
  }
  // if there's no net connection, but there was one last time
  // through the loop, then stop the client:
  if (!client.connected() && lastConnected) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
  }
  
  // if you're not connected, and ten seconds have passed since
  // your last connection, then connect again and send data:
  if(!client.connected() && (millis() - lastConnectionTime > postingInterval)) {
    // read sensor data, replace with your code
    //int sensorReading = readLightSensor();
    Serial.print("yeelink:");
    //get data from server  
    getData();
  }
  // store the state of the connection for next time through
  // the loop:
  lastConnected = client.connected();
}



// this method makes a HTTP connection to the server and get data back
void getData(void) {
  // if there's a successful connection:
  if (client.connect(server, 80)) {
    Serial.println("connecting...");
    // send the HTTP GET request:
    
    client.print("GET /v1.0/device/");
    client.print(DEVICEID);
    client.print("/sensor/");
    client.print(SENSORID);
    client.print("/datapoints");
    client.println(" HTTP/1.1");
    client.println("Host: api.yeelink.net");
    client.print("Accept: *");
    client.print("/");
    client.println("*");
    client.print("U-ApiKey: ");
    client.println(APIKEY);
    client.println("Content-Length: 0");
    client.println("Connection: close");
    client.println();
    Serial.println("print get done.");
    
  } 
  else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
  }
   // note the time that the connection was made or attempted:
  lastConnectionTime = millis();
}
{% endcodeblock %}

你只要将程序中的三个常量APIKEY DEVICEID SENSORID改成你自己在yeelink上得到的值。
<br>
### 附上两张照片   
<br>
{% img left /images/post/arduino2.png "Arduino Yeelink" "Arduino Yeelink" %}
<br><br>

{% img left /images/post/arduino3.png "Arduino Yeelink" "Arduino Yeelink" %}


 {% include links %}

[yeelink]: http://www.yeelink.net/
[arduino]: www.arduino.cc