/**
 * Created by Carlos on 27/01/2016.
 */

/*Global objects*/
var masterClass = 'mychart';
var mainDataClassName = 'c3-target-main-data';
var secondDataClassName = 'c3-target-second-data';
var thirdDataClassName = 'c3-target-third-data';
var chartObject;
var maxChartsToShow;
var colorsArray = ["#01a982", "#614767", "#ff8d6d"]; //TODO how to do this with CSS?

            /***
             * Does nothing - needed to block build in mouseover mouseout events
             * @param id
             */
            function doNothing(id){
                return;
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
                for (var key in data.licenses) {
                    columnsArray.push(data.licenses[key]); //the array of data points that is displayed on the chart
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
                var el = d3.select("."+masterClass+" .c3-line-"+id); //access the lines directly by id

                el.classed({
                    'c3-target-main-data':flags[0],
                    'c3-target-second-data':flags[1],
                    'c3-target-third-data':flags[2]
                });
            }

            function onLegendClick(clickedId) {
                var shown=[];
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
                    setCustomClasses(clickedId,[true,false,false]); //make the new one MAIN line
                }
                setCustomClasses(shown[0],[false,true,false]);
                setCustomClasses(shown[1],[false,false,true]);
                setColors(shown);

                chartObject.hide(); //hide all
                chartObject.show(shown);
            }

            /**
             * Define c3 line chart for license usage information
             * @param bindToSelector
             * @param data
             * @returns {{bindto: *, data: {x: *, columns: Array, xFormat: string}, axis: {y: {label: string, padding: {top: number, bottom: number}, tick: {format: Function}}, x: {type: string, tick: {format: string}, padding: {left: number, right: number}}}}}
             */
            function getC3LicenseUsageChart(bindToSelector, data, maxResults){
                //var _NEWLINE = "&#xA;"
                var xAxisName = data.xAxisName;
                var xFormat = data.xFormat;
                var chartData = getChartData(data);
                maxChartsToShow = maxResults;

                /*Object that represents structure and properties of the c3 chart*/
                var chartObjectDefinition = {
                    bindto: bindToSelector,
                    legend: {
                        show: true,
                        position: 'right',
                        inset: {
                            anchor: 'top-right',
                            x: 20,
                            y: 10,
                            step: data.licenses.length
                        },
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
                        show: false
                    },
                    data: {
                        type: 'area-spline', //TODO check if its ok with UX (spline not line)
                        x: xAxisName,
                        columns: chartData["columns"],
                        names: chartData["names"],
                        classes: { //access via c3-target-main-data
                            data1: "main-data",
                            data2: "second-data",
                            data3: "third-data"
                        },
                        colors:{
                            data1: colorsArray[0],
                            data2: colorsArray[1],
                            data3: colorsArray[2]
                        },
                        shown: ["data1","data2","data3"],
                        xFormat: "%Y-%m" //this tells the chart how to interpret the x axis data
                    },
                    point: {
                        show: false,
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
                                bottom: 1
                            },
                            tick: {
                                format: function(y){
                                    return y+'%';
                                }
                            }
                        },
                        x: {
                            type: 'timeseries',
                            tick: {
                                max: 0,
                                format: '%b-%Y' //this tells the chart how to display the x axis data
                            },
                            padding:{
                                left: 100,
                                right: 100
                            }
                        }
                    },
                    transition: {
                        duration: 500
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
                    c3.generate(getC3LicenseUsageChart('#solutionLicenseUsageChart', data.data, 3));
                }
            );*/





