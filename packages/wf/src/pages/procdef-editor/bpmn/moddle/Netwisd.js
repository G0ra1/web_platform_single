export default {
                                        
    "name": "Netwisd",
    "uri": "http://netwisd.org/schema/1.0/bpmn",
    "prefix": "netwisd",
    "xml": {
      "tagAlias": "lowerCase"
    },
    "associations": [],
    "types": [
      // ----------bpmn 抽象层----------
      // 流程标签抽象元素
      {
        "name": "Process",
        "extends": [ "bpmn:Process" ],
        "isAbstract": true,
        "properties": [
          {
            "isAttr": true,
            "name": "netwisd:procdefNameAbbr",
            "ns": {
              "localName": "procdefNameAbbr",
              "name": "netwisd:procdefNameAbbr",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:procdefTypeName",
            "ns": {
              "localName": "procdefTypeName",
              "name": "netwisd:procdefTypeName",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:procdefTypeId",
            "ns": {
              "localName": "procdefTypeId",
              "name": "netwisd:procdefTypeId",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:remark",
            "ns": {
              "localName": "remark",
              "name": "netwisd:remark",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:icon",
            "ns": {
              "localName": "icon",
              "name": "netwisd:icon",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      // 
      {
        "name": "UserTask",
        "extends": [ "bpmn:UserTask" ],
        "isAbstract": true,
        "properties": [
          {
            "isAttr": true,
            "name": "netwisd:dueDay",
            "ns": {
              "localName": "dueDay",
              "name": "netwisd:dueDay",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:selectRule",
            "ns": {
              "localName": "selectRule",
              "name": "netwisd:selectRule",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:batchRule",
            "ns": {
              "localName": "batchRule",
              "name": "netwisd:batchRule",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:cancelRule",
            "ns": {
              "localName": "cancelRule",
              "name": "netwisd:cancelRule",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:returnRule",
            "ns": {
              "localName": "returnRule",
              "name": "netwisd:returnRule",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      // 会签属性
      {
        "name": "Passing",
        "isAbstract": true,
        "extends": [ "bpmn:MultiInstanceLoopCharacteristics" ],
        "properties": [
          {
            "name": "passingRate",
            "isAttr": true,
            "ns": {
              "localName": "passingRate",
              "name": "netwisd:passingRate",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "name": "passingHandle",
            "isAttr": true,
            "ns": {
              "localName": "passingHandle",
              "name": "netwisd:passingHandle",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "name": "unpassingHandle",
            "isAttr": true,
            "ns": {
              "localName": "unpassingHandle",
              "name": "netwisd:unpassingHandle",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      // callActivity 抽象
      {
        "name": "CallActivity",
        "extends": [ "bpmn:CallActivity" ],
        "isAbstract": true,
        "properties": [
          {
            "isAttr": true,
            "name": "netwisd:isLookOver",
            "ns": {
              "localName": "isLookOver",
              "name": "netwisd:isLookOver",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:isLookMe",
            "ns": {
              "localName": "isLookMe",
              "name": "netwisd:isLookMe",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:inited",
            "ns": {
              "localName": "inited",
              "name": "netwisd:inited",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:cmdChildLogProcdefId",
            "ns": {
              "localName": "cmdChildLogProcdefId",
              "name": "netwisd:cmdChildLogProcdefId",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:ctmChildLogProcdefId",
            "ns": {
              "localName": "ctmChildLogProcdefId",
              "name": "netwisd:ctmChildLogProcdefId",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:childProcdefName",
            "ns": {
              "localName": "childProcdefName",
              "name": "netwisd:childProcdefName",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      // camunda 抽象--------
      {
        "name": "In",
        "extends": [ "camunda:In" ],
        "isAbstract": true,
        "properties": [
          {
            "isAttr": true,
            "name": "netwisd:readOnly",
            "ns": {
              "localName": "readOnly",
              "name": "netwisd:readOnly",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      {
        "name": "Out",
        "extends": [ "camunda:Out" ],
        "isAbstract": true,
        "properties": [
          {
            "isAttr": true,
            "name": "netwisd:readOnly",
            "ns": {
              "localName": "readOnly",
              "name": "netwisd:readOnly",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      {
        "name": "FieldParameter",
        "extends": [ "camunda:Field" ],
        "isAbstract": true,
        "properties": [
          {
            "isAttr": true,
            "name": "netwisd:id",
            "ns": {
              "localName": "id",
              "name": "netwisd:id",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:isPullDown",
            "ns": {
              "localName": "isPullDown",
              "name": "netwisd:isPullDown",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:paramName",
            "ns": {
              "localName": "paramName",
              "name": "netwisd:paramName",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      {
        "name": "ListenerParameter",
        "extends": [ "camunda:ExecutionListener", "camunda:TaskListener" ],
        "isAbstract": true,
        "properties": [
          {
            "isAttr": true,
            "name": "netwisd:eventId",
            "ns": {
              "localName": "eventId",
              "name": "netwisd:eventId",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:eventName",
            "ns": {
              "localName": "eventName",
              "name": "netwisd:eventName",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:eventSubmitSign",
            "ns": {
              "localName": "eventSubmitSign",
              "name": "netwisd:eventSubmitSign",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:listenerId",
            "ns": {
              "localName": "listenerId",
              "name": "netwisd:listenerId",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:listenerType",
            "ns": {
              "localName": "listenerType",
              "name": "netwisd:listenerType",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:listenerImpl",
            "ns": {
              "localName": "listenerImpl",
              "name": "netwisd:listenerImpl",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:eventSelectMust",
            "ns": {
              "localName": "eventSelectMust",
              "name": "netwisd:eventSelectMust",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:openApiPath",
            "ns": {
              "localName": "openApiPath",
              "name": "netwisd:openApiPath",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:openApiMthDes",
            "ns": {
              "localName": "openApiMthDes",
              "name": "netwisd:openApiMthDes",
              "prefix": "netwisd"
            },
            "type": "String"
          },
          {
            "isAttr": true,
            "name": "netwisd:order",
            "ns": {
              "localName": "order",
              "name": "netwisd:order",
              "prefix": "netwisd"
            },
            "type": "String"
          }
        ]
      },
      // {
      //   "name": "TaskListenerParameter",
      //   "extends": [ "camunda:TaskListener" ],
      //   "isAbstract": true,
      //   "properties": [
      //     {
      //       "isAttr": true,
      //       "name": "netwisd:eventId",
      //       "ns": {
      //         "localName": "eventId",
      //         "name": "netwisd:eventId",
      //         "prefix": "netwisd"
      //       },
      //       "type": "String"
      //     },
      //     {
      //       "isAttr": true,
      //       "name": "netwisd:eventName",
      //       "ns": {
      //         "localName": "eventName",
      //         "name": "netwisd:eventName",
      //         "prefix": "netwisd"
      //       },
      //       "type": "String"
      //     },
      //     {
      //       "isAttr": true,
      //       "name": "netwisd:eventSelectMust",
      //       "ns": {
      //         "localName": "eventSelectMust",
      //         "name": "netwisd:eventSelectMust",
      //         "prefix": "netwisd"
      //       },
      //       "type": "String"
      //     },
      //   ]
      // },

      // netwisd 定义标签----------
      //表单------
      // {
      //     "name": "Forms",
      //     "superClass": [ "Element" ],
      //     "meta": {
      //       "allowedIn": [
      //         "bpmn:Process",
      //         "bpmn:UserTask"
      //       ]
      //     },
      //     "properties": [{ // 对象内属性
      //       "name": "values",
      //       "type": "Form",
      //       "isMany": true
      //     }]
      // },
      // 表单
      {
        "name": "Form",
        "superClass": [ "Element" ],
        "meta": {
          "allowedIn": [
            "bpmn:Process",
            "bpmn:UserTask"
          ]
        },
        "properties": [{ // 对象内属性
            "name": "values",
            "type": "Field",
            "isMany": true
        },{
          "name": "id",
          "isAttr": true,
          "type": "String"
        },{
          "name": "pageUrl",
          "isAttr": true,
          "type": "String"
        },{
          "name": "formName",
          "isAttr": true,
          "type": "String"
        },{
          "name": "formNameCh",
          "isAttr": true,
          "type": "String"
        },{
          "name": "cptId",
          "isAttr": true,
          "type": "String"
        },{
          "name": "cptFullName",
          "isAttr": true,
          "type": "String"
        }]
    },
    {
      "name": "Field",
      "superClass": [ "Element" ],
      "meta": {
        "allowedIn": [
          "netwisd:Form",
          "netwisd:TaskListener",
          "netwisd:ExecutionListener"
        ]
      },
      "properties": [
        // ---表单中使用modelFieldId
        {
          "name": "modelFieldId",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "id",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "javaName",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "nameCh",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isMoreRow",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "dbType",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "powerCode",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "orm",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isOrm",
          "isAttr": true,
          "type": "String"
        },
        //-----------XHL 添加 2022-08-03
        {
          "name": "sourceName",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "javaType",
          "isAttr": true,
          "type": "String"
        },

        // ----------废弃
        {
          "name": "varId",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "varName",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "varType",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isView",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isWrite",
          "isAttr": true,
          "type": "String"
        },
        // --------事件使用---------
        {
          "name": "name",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "paramName",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isPullDown",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "expression",
          "type": "String"
        },
        {
          "name": "string",
          "type": "String"
        }
      ]
    },
    //-----------以上为新的
        {
            "name": "Test",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:UserTask"
              ]
            },
            "properties": [
              {
                "name": "testx",
                "isAttr": true,
                "type": "String"
              }
            ]
        },
        // -------自定义标签------
        // 自定义事件
        {
            "name": "TaskListener",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:Process",
                "bpmn:StartEvent",
                "bpmn:UserTask",
                "bpmn:SequenceFlow",
                "bpmn:EndEvent"
              ]
            },
            "properties": [
              {
                "name": "class",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "event",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventId",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventName",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventSubmitSign",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "listenerId",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "listenerImpl",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventSelectMust",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "order",
                "isAttr": true,
                "type": "String"
              },
              { // 对象内属性
                "name": "fields",
                "type": "Field",
                "isMany": true
              }
            ]
        },
        // {
        //     "name": "Field",
        //     "superClass": [ "Element" ],
        //     "meta": {
        //       "allowedIn": [
        //         "netwisd:TaskListener"
        //       ]
        //     },
        //     "properties": [
        //       {
        //         "name": "id",
        //         "isAttr": true,
        //         "type": "String"
        //       },
        //       {
        //         "name": "name",
        //         "isAttr": true,
        //         "type": "String"
        //       },
        //       {
        //         "name": "paramName",
        //         "isAttr": true,
        //         "type": "String"
        //       },
        //       {
        //         "name": "expression",
        //         "type": "String"
        //       },
        //       {
        //         "name": "string",
        //         "type": "String"
        //       }
        //     ]
        // },
        {
            "name": "ExecutionListener",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:Process",
                "bpmn:StartEvent",
                "bpmn:UserTask",
                "bpmn:SequenceFlow",
                "bpmn:EndEvent"
              ]
            },
            "properties": [
              {
                "name": "class",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "event",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventId",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventName",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventSubmitSign",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "listenerId",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "listenerImpl",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "eventSelectMust",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "order",
                "isAttr": true,
                "type": "String"
              },
              { // 对象内属性
                "name": "fields",
                "type": "Field",
                "isMany": true
              }
            ]
        },
        // {
        //     "name": "Field",
        //     "superClass": [ "Element" ],
        //     "meta": {
        //       "allowedIn": [
        //         "netwisd:ExecutionListener"
        //       ]
        //     },
        //     "properties": [
        //       {
        //         "name": "id",
        //         "isAttr": true,
        //         "type": "String"
        //       },
        //       {
        //         "name": "name",
        //         "isAttr": true,
        //         "type": "String"
        //       },
        //       {
        //         "name": "paramName",
        //         "isAttr": true,
        //         "type": "String"
        //       },
        //       {
        //         "name": "expression",
        //         "type": "String"
        //       },
        //       {
        //         "name": "string",
        //         "type": "String"
        //       }
        //     ]
        // },
        // 按钮组
        {
            "name": "Buttons",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:Process"
              ]
            },
            "properties": [{ // 对象内属性
                "name": "values",
                "type": "Button",
                "isMany": true
            }]
        },
        // 按钮
        {
            "name": "Button",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "netwisd:Buttons"
              ]
            },
            "properties": [
              {
                "name": "id",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "name",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "code",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "isEnable",
                "isAttr": true,
                "type": "String"
              },
            ]
        },
        // 人员组
        {
            "name": "HumanExps",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:UserTask"
              ]
            },
            "properties": [{ // 对象内属性
                "name": "values",
                "type": "HumanExp",
                "isMany": true
            }]
        },
        // 人员
        {
            "name": "HumanExp",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "netwisd:HumanExps"
              ]
            },
            "properties": [
                { // 对象内属性
                    "name": "expreId",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreName",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreExpression",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "bizType",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "bizId",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "bizText",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "values",
                    "type": "HumanExpParam",
                    "isMany": true
                }
            ]
        },
        // 人员参数
        {
            "name": "HumanExpParam",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "netwisd:HumanExp"
              ]
            },
            "properties": [
                { // 对象内属性
                    "name": "expreParamName",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreParamDesc",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreParamId",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreParamValue",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreParamValueText",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreParamValueId",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreParamSource",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "expreParamVarType",
                    "isAttr": true,
                    "type": "String"
                },
                { // 对象内属性
                    "name": "dbId",
                    "isAttr": true,
                    "type": "String"
                },
            ]
        },
        
        // 变量
        {
            "name": "Vars",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:UserTask",
                "bpmn:SequenceFlow"
              ]
            },
            "properties": [{ // 对象内属性
                "name": "values",
                "type": "Var",
                "isMany": true
            }]
        },
        {
            "name": "Var",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "netwisd:Vars"
              ]
            },
            "properties": [
              {
                "name": "actionScope",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "formId",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "modelFieldId",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "isMoreRow",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "formName",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "javaName",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "expreJavaName",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "nameCh",
                "isAttr": true,
                "type": "String"
              },


              // {
              //   "name": "formVarId",
              //   "isAttr": true,
              //   "type": "String"
              // },
             
              // {
              //   "name": "varId",
              //   "isAttr": true,
              //   "type": "String"
              // },
              // {
              //   "name": "formVarName",
              //   "isAttr": true,
              //   "type": "String"
              // },
              // {
              //   "name": "javaType",
              //   "isAttr": true,
              //   "type": "String"
              // }
            ]
        },
        // 公式
        {
            "name": "SequExps",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:SequenceFlow"
              ]
            },
            "properties": [
                {
                    "name": "id",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "expression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "dbId",
                    "isAttr": true,
                    "type": "String"
                },
                // { // 对象内属性
                //   "name": "values",
                //   "type": "NodeButton",
                //   "isMany": true
                // }
            ]
        },
        {
            "name": "SequExpText",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:SequenceFlow"
              ]
            },
            "properties": [
              {
                "name": "body",
                "isBody": true,
                "type": "String"
              }
            ]
        },
        
        
    ],
    "emumerations": [ ]
}