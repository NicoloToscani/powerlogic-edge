# powerlogic-edge

Node JS application for SIMATIC WinCC Unified to read energy consumption from Schneider PowerLogic series over Modbus TCP/IP.

## Energy data

List of **PowerLogic** meter data:

| Measure                            | Units                 | Type          | 
| ---------------------------------- | --------------------- | ------------- | 
|  I1: phase 1 current               | A                     | Float32       | 
|  I2: phase 2 current               | A                     | Float32       |
|  I3: phase 3 current               | A                     | Float32       |
|  Voltage L1-L2                     | V                     | Float32       |
|  Voltage L2-L3                     | V                     | Float32       |
|  Voltage L3-L1                     | V                     | Float32       |
|  Voltage L-L Avg                   | V                     | Float32       |
|  Voltage L1-N                      | V                     | Float32       |
|  Voltage L2-N                      | V                     | Float32       |
|  Voltage L3-N                      | V                     | Float32       |
|  Voltage L-N Avg                   | V                     | Float32       |
|  Active power phase 1              | kW                    | Float32       |
|  Active power phase 2              | kW                    | Float32       |
|  Active power phase 3              | kW                    | Float32       |
|  Total active power                | kW                    | Float32       |
|  Power factor total                | -                     | Float32       |
|  Frequency                         | Hz                    | Float32       |
|  Total active energy import        | Wh                    | Int64         |

## Install the App

*powerlogic-edge* comes with pre-builded ```powerlogic-edge_x.x.x.app``` package that can be installed specifically on Unified Comfort Panels that runs SIMATIC Edge Runtime.

### Download the App

The **powerlogic-edge** app can be downloaded in .app format from this repository: ```powerlogic-edge_x.x.x.app```

### Prerequisites

1. A Unified Comfort Panel with SIMATIC Edge feature enabled.
2. At least one user needs to be signed up

### Load App on Unified Comfort Panels

1. Copy the downloaded ```powerlogic-edge_x.x.x.app``` file to your Developer PC.
2. Open the Industrial Edge Management Web Page of UCP on ```https://<ucp-address>```
3. Import the .app file using the *Import Offline* button
4. Wait until App is installed

## WinCC Unified Configuration

In order for the application to work, it is necessary to insert some elements inside your WinCC Unified project, including :

- **"EdgePowerLogicTags"** Table Variables;

These elements are included in a TIA Portal V17 library **"EdgePowerLogicLibrary"** provided along with the powerlogic-edge application and an application example.

### "EdgePowerLogicLibrary" Library Import

From the TIA Portal V17 engineering software, open the **"Library"** side menu.
Use the **"Open Global Libraries"** button and import the ```EdgePowerLogicLibrary.zal17``` file.

![6_WinCCUnifiedConfiguration_ImportLibrary](./docs/img/6_WinCCUnifiedConfiguration_ImportLibrary.png)

### Table "EdgePowerLogicTags" variables

Import the **"EdgePowerLogicTags"** Tags table within the HMI Tags of your TIA Portal V17 project.

![6_WinCCUnifiedConfiguration_EdgeReportTags](./docs/img/6_WinCCUnifiedConfiguration_EdgeReportTags.png)

Below are the details of the HMI Tags of the **"EdgeReportTags"** variable table:
| **HMI Tag Name** | **Type** | **Description** |
|---|---|---|
| *ReportEndTimeTag* | WString                | Final time instant of the report. The format must adhere to date-time standards, *e.g. 01-01-2021, 12:00:00 PM*. See details here for accepted standards https://www.w3schools.com/js/js_date_formats.asp . |
| *ReportStartTimeTag* | WString                | Initial time instant of the report. The format must adhere to date-time standards, *e.g. 01-01-2021, 12:00:00 PM*. Details on accepted standards here https://www.w3schools.com/js/js_date_formats.asp . |
| *ReportFilenameTag* | WString        | Name of the last generated report file. Needed for PDF conversion by the **"EdgeReportGlobalModule"** scripts. |
| *rpc_request* | Array [0..100] of WString        | Array of strings that contains the query for the report-unified application to read data.  The request can exceed 254 characters (limit of a WString variable), so it is split into fragments within this array. The request is then reassembled within the scripts of the **"EdgeReportGlobalModule"**. |
| *rpc_request_status* | Int                | Status variable of the report-unified application requests. It is used as a trigger of the Scheduled **EdgeReportTriggerTask** during the generation of the report file. It can take on the following states: |
|  |  | **0** = Off |
|  |  | **1** = Reading request sent |
|  |  | **2** = File Report generated |
| *rpc_response* | WString                | Status variable of the responses provided by the WinCC Unified system to the report-unified application. It is used to describe the status of operations performed by WinCC Unified during the generation of the report file. It can take on the following states: |
|  |  | **0** = Off |
|  |  | **1** = Response with data sent to the app |
|  |  | **2** = Report file converted to PDF |
| *TemplateFilenameTag* | WString                        | Name of the template file to be used for report file generation. The name must match the name of the file loaded in the ```cfg-data/``` configuration volume of the report-edge app. The file format can be *.xlsx* or other formats as mentioned in Section [Introduction](#introduction). |
| *TriggerTag1* | Bool                | Trigger variable for report generation. To trigger report generation this variable must make a positive edge *(0 --> 1)*. |
| *TriggerDeleteReports* | Bool | Trigger variable for deleting all report files currently saved by the application. To delete all report files this variable must make a positive edge *(0 --> 1)*. |

## Release History

- 0.0.1
  - The first release.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contributing

1. Fork it ([https://github.com/yourname/yourproject/fork](https://github.com/yourname/yourproject/fork))
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Contacts

- Nicolò Toscani - [toscani.nicolo90@gmail.com](toscani.nicolo90@gmail.com)


