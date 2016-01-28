/**
 * Created by Carlos on 27/01/2016.
 */

/*Global objects*/
var chartObject;
var maxChartsToShow;
var colorsArray = [];
main: "#01a982",
    second: "#614767",
    third: "#ff8d6d"
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




            function onLegendClick(clickedId) {
                var shown=[];
                var remove = false;
                var shownObj = chartObject.data.shown();
                //fetch all shown ids
                for (var i = 0; i < shownObj.length; i++) {
                    if(clickedId != shownObj[i].id){
                        shown.push(shownObj[i].id);
                    }else{
                        remove = true;
                    }
                }

                //cut out only the first maxChartsToShow-1, since we are going to add a new one and we need the space
                if (shown.length > maxChartsToShow-1) {
                    shown = shown.slice(0, maxChartsToShow - 1);
                }

                if(!remove){
                    shown.push(clickedId);
                }

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
                        colors: { //TODO move to CSS?
                            data1: "#01a982",
                            data2: "#614767",
                            data3: "#ff8d6d"
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





