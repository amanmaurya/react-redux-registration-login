/*
* Basic responsive mashup template
* @owner Enter you name here (xxx)
*/
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
    host: 'apps.instantview.io',
    prefix: '/dmd/',
    port: '443',
    isSecure: true
};
var appid = "3872e356-a8bd-4611-a756-0137f238fecb";

function CallQlik() {
    require.config({
        baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
    });

    require(["js/qlik"], function (qlik) {
        qlik.setOnError(function (error) {
            $('#popupText').append(error.message + "<br>");
            $('#popup').fadeIn(1000);
        });
        $("#closePopup").click(function () {
            $('#popup').hide();
        });

        var app = qlik.openApp(appid, config);

        var PageName = DmdURLParameter('page').replace(/%20/g, " "); // removes %20 and replaces them with spaces

        app.variable.getContent('v_AppsList', function (reply) {

            var userAppsList = reply.qContent.qString.split(','); // Users Applications List

            for (i = 0; i < userAppsList.length; i++) {
                userAppsList[i] = userAppsList[i].trim();
            }



            /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< User Wise Pages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
            if (userAppsList.indexOf(PageName) >= 0) {
                app.field('_Application_Name').selectValues([PageName], false, true);

                app.variable.getContent('v_pagelist')
                    .then(function (varContent) {
                        //console.log(varContent.qContent.qString)

                        window.pagesList = varContent.qContent.qString
                        window.flag = true;
                        console.log('from Qlik js, data fatched')
                    })
                    .catch(function (ex) {
                        console.log(ex)
                    });
            }
        });
    });

    function DmdURLParameter(Parameter) {
        var FullURL = window.location.search.substring(1);
        var ParameterArray = FullURL.split('&');
        //console.log("you there");
        for (var i = 0; i < ParameterArray.length; i++) {

            var CurrentParameter = ParameterArray[i].split('=');
            if (CurrentParameter[0] == Parameter) {
                return CurrentParameter[1];
            }
        }

    }
}