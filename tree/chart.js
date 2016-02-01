/**
 * Created by Carlos on 27/01/2016.
 */

/*Global objects*/
var containerElementSelector;// = 'mychart';
var mainDataClassName;// = 'c3-target-main-data';
var secondDataClassName;// = 'c3-target-second-data';
var thirdDataClassName;// = 'c3-target-third-data';
var chartObject;
var maxChartsToShow;
var colorsArray;// = ["#01a982", "#614767", "#ff8d6d","#f0f0f0"]; //TODO how to do this with CSS?
var shown;


            /***
             * Does nothing - needed to block build in mouseover mouseout events
             * @param id
             */
            function doNothing(id){
                return;
            }

            function initChart(shownIdArray, colorPaletteArray, shownCssArray){
                //TODO init masterClass from dom object
                shown = shownIdArray; //set the array of displayed lines
                colorsArray = colorPaletteArray;
                //TODO configure automatically
                mainDataClassName = 'c3-target-'+shownCssArray[0];
                secondDataClassName = 'c3-target-'+shownCssArray[1];
                thirdDataClassName = 'c3-target-'+shownCssArray[2];

            }

            function createC3LineChart(bindToSelector, data, initialElementsArray, secondaryAxisRegex){
                containerElementSelector = bindToSelector;

                /*create and init*/
                chartObject = c3.generate(getC3LineChart(bindToSelector, data, initialElementsArray.length));

                /*post creation init - mostly UI init*/
                chartObject.hide();
                chartObject.show(initialElementsArray);
                //TODO configure automatic
                setCustomClasses(shown[0],[true,false,false]);
                setCustomClasses(shown[1],[false,true,false]);
                setCustomClasses(shown[2],[false,false,true]);

                //todo move to custom design
                //setSecondaryXAxisTicks(data["xAxisName"], "^20[0-9][0-9]");


                return chartObject;
            }

            /**
             * build an array of arrays containing the xAxis labels and the actual data
             * @param data
             * @returns {Array}
             */
            function getChartData(data) {
                var i = 0;
                var namesArray=[]; //global objects
                var columnsArray=[];
                var chartData=[];
                for (var key in data) {
                    columnsArray.push(data[key]); //the array of data points that is displayed on the chart
                    namesArray['data' + i] = key.toString(); //the names that is going to displayed
                    i++;
                }

                chartData["columns"] = columnsArray;
                chartData["names"] = namesArray;

                return chartData;

            }

            function setColors(idList){
                var colors=[];
                for (var i = 0; i < idList.length; i++) {
                    colors[idList[i]]=colorsArray[i];
                }
                chartObject.data.colors(colors);
            }

            function setCustomClasses(id,flags){
                var el = d3.select(containerElementSelector+" .c3-line-"+id); //access the lines directly by id

                el.classed({
                    'c3-target-main-data':flags[0],
                    'c3-target-second-data':flags[1],
                    'c3-target-third-data':flags[2]
                });
            }

            /**
             * Will be implemented in the future by c3 (multiline xAxis)
             * @param xAxisData
             */
            function setSecondaryXAxisTicks(xAxisData, regexSelector){
                if(xAxisData) {
                    var legendArray = d3.selectAll(".mychart .c3-axis-x .tick text[style*='display: block']");
                    for (var i = 1; i < regexSelector.length; i++) {
                        legendArray[0][i].append("tspan")
                                        .text(xAxisData[i].match(regexSelector))
                                        .attr("dy", "12")
                                        .attr("x", "0");
                    }

                }
            }

            function addCustomDesignElements(){
                //TODO add text above legend
                //TODO add wrapping square around legend
            }

            /***
             *
             * @param clickedId
             */
            function onLegendClick(clickedId) {
                shown = []; //reset shown array
                var remove = false;
                var shownObj = chartObject.data.shown();
                //fetch all shown ids
                for (var i = 0; i < shownObj.length; i++) {
                    if(clickedId != shownObj[i].id){
                        shown.push(shownObj[i].id);
                    }else{
                        setCustomClasses(shownObj[i].id,[false,false,false]); //remove main visible classes from unselected element
                        remove = true;
                    }
                }

                //cut out only the first maxChartsToShow-1, since we are going to add a new one and we need the space
                if (shown.length > maxChartsToShow-1) {
                    shown = shown.slice(0, maxChartsToShow - 1);
                }

                if(!remove){
                    shown.push(clickedId);
                    setCustomClasses(clickedId,[false,false,true]); //make the new one MAIN line

                }
                setCustomClasses(shown[0],[true,false,false]);
                setCustomClasses(shown[1],[false,true,false]);
                setColors(shown);

                chartObject.hide(); //hide all
                chartObject.show(shown);
            }

            /**
             * Define c3 line chart for license usage information
             * @param bindToSelector
             * @param data
             * @returns
             * */
            function getC3LineChart(bindToSelector, data, maxDisplayedResults){
                //var xAxisName = data.xAxisName;
                var xFormat = data.xFormat;
                var chartData = getChartData(data);
                maxChartsToShow = maxDisplayedResults;

                /*Object that represents structure and properties of the c3 chart*/
                var chartObjectDefinition = {
                    bindto: bindToSelector,
                    legend: {
                        show: true,
                        position: 'right',
                        item: {
                            onclick: onLegendClick,
                            onmouseover: doNothing,
                            onmouseout: doNothing
                        }
                    },
                    grid: {
                        x: {
                            show: false
                        },
                        y: {
                            show: true
                        }
                    },
                    tooltip: {
                        show: true,
/*                        position: function (data, width, height, element) {
                            var x = element.getBoundingClientRect().left; //this is the exact point location
                            return {top: height, left: x}
                        },*/
                        contents: function (points) {
                            //TODO add validations
                            var valuesListTemplate = "<div id='tooltip-$index'><div class='left'>$name</div><div class='right'>$value</div></div>";
                            var valuesListHtml="";
                            var dateFormatter = d3.time.format("%b-%Y"); //formatter of the bottom MON-YYYY value

                            points.forEach(function(currentPoint, index, array){
                                valuesListHtml += valuesListTemplate.replace("$index",index).replace("$name", currentPoint.name).replace("$value",currentPoint.value);
                            });

                            //var valueFormat = d3.format("$,.2f");
                            var dateString = dateFormatter(points[0].x);

                            var html = '<div class="tooltip-value">'+valuesListHtml+'</div>'
                            html += '<div class="tooltip-date triangled">'+dateString+'</div>';

                            return html;
                        }
                    },
                    data: {
                        type: 'area-spline', //TODO check if its ok with UX (spline not line)
                        x: "xAxisName",
                        columns: chartData["columns"],
                        names: chartData["names"],
                        color: function (color, d) {
                            try{
                                /*d can be object or plain string (id like data1)
                                 depends on the color it represents, if its legend its plain id, if its line its an obj*/
                                var inx;
                                (d.id) ? inx= shown.indexOf(d.id) : inx= shown.indexOf(d);
                                return (inx < 0) ? colorsArray[colorsArray.length-1] : colorsArray[inx];
                            }
                            catch(e){
                                return color;
                            }
                        },
                        shown: shown,
                        xFormat: "%Y-%m" //this tells the chart how to interpret the x axis data
                    },
                    point: {
                        show: true,
                        r: 5,
                        focus: {
                            expand: {
                                enabled: true,
                                r: 5
                            }
                        }

                    },
                    axis: {
                        y: {
                            show: true,
                            label:{
                                text: 'License Usage %',
                                position: 'outer-middle'
                            },
                            padding: {
                                top: 60,
                                bottom: 30
                            },
                            tick: {
                                format: function(y){
                                    return y+'%';
                                }
                            }
                        },
                        x: {
                            type: 'timeseries',
                            height: 50,
                            tick: {
                                max: 0,
                                fit: true,
                                format: '%b' //this tells the chart how to display the x axis data
                            },
                            padding:{
                                left: 100,
                                right: 0
                            }
                        }
                    },
                    transition: {
                        duration: 500
                    },
                    onrendered: function(){
                    },
                    oninit: function() {
                        //TODO move to constructor function
                        initChart(["data1","data2","data3"],
                                  ["#01a982", "#614767", "#ff8d6d","#f0f0f0"],
                                  ["main-data", "second-data", "third-data"]);
                    }
                }

                return chartObjectDefinition;
            }

            /***
             * Building data structure for graph to display
             */
  /*          var endDate = new Date();
            var endYM = endDate.getFullYear()+"-"+(endDate.getMonth()+1);
            //Take a year from now
            var startDate = new Date(endDate.getFullYear()-1, (endDate.getMonth()+1), 1);
            var startYM = startDate.getFullYear()+"-"+(startDate.getMonth());
*/
            /*Request license usage data*/
/*            getDashboardLicenseUsage($stateParams.productId, startYM, endYM){}
                .then(function (data) {
                    //TODO the selector of the hosting element should be passed dynamically

                    //the actual generation and placemenet of the chart inside DOM element
                    c3.generate(getC3LineChart('#solutionLicenseUsageChart', data.data, 3));
                }
            );*/





