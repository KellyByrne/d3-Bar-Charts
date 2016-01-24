app.controller('HomeCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
  $scope.showcolors = false;
  $scope.customData = [{label: 'input.label1' , value: 'input.value1'}];
  $scope.yourColor = "#f8d965";
  $scope.mouseOverColor = "#fae596";

  $scope.addInput = function(){
    var dataLength = $scope.customData.length+1;
    $scope.customData.push({label:'input.label' + dataLength, value: 'input.value' + dataLength})
  }

  $scope.removeInput = function(){
    var lastInput = $scope.customData.length-1;
    if($scope.customData.length == 1) return;
    else {$scope.customData.splice(lastInput)};
  }

  $scope.chosenColor = function(light, dark){
    $scope.yourColor = light;
    $scope.mouseOverColor = dark;
  }

  $scope.createBarChart = function(){
    $scope.graph = "true";
    var inputs = [];

    for(var i=0; i<$scope.customData.length; i++) {
      inputs.push({values: $scope.customData[i].value1, labels: $scope.customData[i].label1});
    };

    console.log(inputs);
    
      var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 760 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var width = 760,
          height = 500;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      x.domain(inputs.map(function(d) { return d.labels; }));
      y.domain([0, d3.max(inputs, function(d) { return d.values; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")

      svg.selectAll(".bar")
          .data(inputs)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.labels); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.values); })
          .attr("height", function(d) { return height - y(d.values); })
          .attr("fill", $scope.yourColor)
          .on("mouseover", function() {
            d3.select(this)
              .attr("fill", $scope.mouseOverColor);
          })
          .on("mouseout", function(){
            d3.select(this)
              .attr("fill", $scope.yourColor)
          })

      function type(d) {
        d.values = +d.values;
        return d;
      }
  
    $scope.customData = [{label: 'input.label1' , value: 'input.value1'}];
  }

}]);

  //Simpler bar chart without labels, sizing different
  // var svgWidth = 200;
    // var svgHeight = 300;
    // var barPadding = 2;

    // var svg = d3.select("#chart")
    //            .append("svg")
    //            .attr("width", svgWidth)
    //            .attr("height", svgHeight);

    // svg.selectAll("rect")
    //   .data(values)
    //   .enter()
    //   .append("rect")
    //   .attr("x", function(d, i) {
  //        return i * (svgWidth / values.length);
  //     })
    //   .attr("y", function(d){
    //      return svgHeight - d; //height minus value
    //   })
    //   .attr("width", svgWidth / values.length - barPadding)
    //   .attr("height", function(d){
    //      return d * 4;
    //   })
    //   .attr("fill", function(d) {
    //      return "rgb(100, 0, " + (d * 10) + ")";
    //   });
    
    // svg.selectAll("text")
  //       .data(values)
  //       .enter()
  //       .append("text")
  //       .text(function(d) {
  //        return d;
  //       })
  //       .attr("x", function(d, i) {
  //        return i * (svgWidth / values.length) + 5;
  //       })
  //       .attr("y", function(d) {
  //        return svgHeight - (d * 4) + 15;
  //       })
  //       .attr("font-family", "sans-serif")
  //       .attr("font-size", "11px")
  //      .attr("fill", "white")
  //      .attr("text-anchor", "middle")
