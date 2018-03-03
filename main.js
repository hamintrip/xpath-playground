$(function(){
  var $xpath = $("#xpath");
  var $input = $("#input");
  var $output = $(".html-output");

  function evalXPath() {
    var $node = $($.parseXML($input.val()));
    var xpathExpr = $xpath.val();
    console.log('expr', xpathExpr);
    return $node.xpath(xpathExpr);
  }

  function nodeToString(node) {
    if (node.nodeType == 2)
      return node.value;
    if (node.nodeType == 3)
      return node.wholeText;
    if (node.nodeType == 8)
      return "<!--" + node.textContent + "-->";
    return node.outerHTML;
  }

  function evalXPathUpdateResult() {
    var buffer = new Array();

    try {
      var nodes = evalXPath();
      var htmlNodes = $.map(nodes, function(node){
        return $("<div>").text(nodeToString(node)).addClass("node");
      });

      $output.addClass('text-primary');
      $output.removeClass('text-danger');
      $output.html(htmlNodes)
      console.info('nodes', nodes);
    } catch (e) {
      $output.removeClass('text-primary');
      $output.addClass('text-danger');
      // TODO: show nicer error message
      $output.html("ERROR: " + e.message)
      console.error(e);
    }
  }

  $xpath.on('keyup', evalXPathUpdateResult);
  evalXPathUpdateResult();
})
