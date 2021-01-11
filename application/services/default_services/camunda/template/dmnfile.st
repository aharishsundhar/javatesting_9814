dmnfile(object) ::=<<
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" xmlns:biodi="http://bpmn.io/schema/dmn/biodi/1.0" id="Definitions_0fnw5vs" name="DRD" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="Accesslevel" name="Authorize">
    <extensionElements>
      <biodi:bounds x="150" y="150" width="180" height="80" />
    </extensionElements>
    <decisionTable id="decisionTable_1">
      <input id="input_1" label="resources">
        <inputExpression id="inputExpression_1" typeRef="string">
          <text>resources</text>
        </inputExpression>
      </input>
      <input id="InputClause_1rqn79m" label="resourcetype">
        <inputExpression id="LiteralExpression_016sarj" typeRef="string">
          <text>resourcetype</text>
        </inputExpression>
      </input>
      <output id="output_1" label="admin" name="Admin" typeRef="string" />
      <output id="OutputClause_0vdltyr" label="developer" name="Developer" typeRef="string" />
      <output id="OutputClause_16m831c" label="user" name="Standard User" typeRef="string" />
      <output id="OutputClause_06hgt34" label="guest" name="Guest" typeRef="string" />
      $if(object)$$object:{value |
        <rule id="DecisionRule_$value.DecisionRuleId$">
        <inputEntry id="UnaryTests_$value.UnaryTestsId$">
          <text>"$value.screen$"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_$value.UnaryTests2Id$">
          <text>"Screen"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_$value.LiteralExpressionId$">
          <text>'
            $value.outputjson$
          '</text>
        </outputEntry>
        <outputEntry id="LiteralExpression_$value.LiteralExpression2Id$">
          <text>'
             $value.outputjson$
          '</text>
        </outputEntry>
        <outputEntry id="LiteralExpression_$value.LiteralExpression3Id$">
          <text>'
              $value.outputjson$
          '</text>
        </outputEntry>
        <outputEntry id="LiteralExpression_$value.LiteralExpression4Id$">
          <text>'
              $value.outputjson$
          '</text>
        </outputEntry>
      </rule>
       };separator="\n"$$endif$
           </decisionTable>
  </decision>
</definitions>
>>