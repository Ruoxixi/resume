/**
 * Created by xudan1 on 2015/7/27.
 * Description:
 * @Author: xudan1
 * @Update:
 */

    var bd = document.getElementsByTagName("body");
    var container = document.querySelector(".resume");
    //init
    var winW = window.screen.width,
        winH = window.screen.height;
    var h = 100;
    var z = 0;

    var wrap = document.querySelectorAll(".resume_wrap");
    for(var i = 0;i<wrap.length;i++){
        wrap[i].setAttribute("index",i);
        wrap[i].style.webkitTransform = "translate3d(0,"+h*i+"%,0)";
        wrap[i].style.mozTransform = "translate3d(0,"+h*i+"%,0)";
        wrap[i].style.transform = "translate3d(0,"+h*i+"%,0)";

        /*var array = new Array();
        var xyz = translate3d(0+"px",h*i+"%",0+"px");
        array.push(xyz);
        console.log(array);
        'translate3d(0px, 0%, 0px)'.replace('(', '("').replace(/,/g, '","').replace(')', '")')*/

    }
    //function translate3d(a, b, c) {return {x: a, y: b, z: c}};


    //scroll
    $('.resume').on('mousewheel', function(event,delta) {
        var self = this;
        if(event.deltaY > 0 ){//up
            --z;
            if(z <= 0 ){
                z = 0;
            }
        }else if(event.deltaY < 0){//down
            z++;
            if(z >= wrap.length ){
                z = wrap.length-1;
            }
        }
        self.style.webkitTransform = "translate3d(0,-"+h*z+"%,0)";
        self.style.mozTransform = "translate3d(0,-"+h*z+"%,0)";
        self.style.transform = "translate3d(0,-"+h*z+"%,0)";
        self.style.webkitTransition = "all 0.3s";
        self.style.mozTransition = "all 0.3s";
        self.style.transition = "all 0.3s";
    });

    //nav click
    var navLi = document.querySelector(".nav").children;
    for(var j = 0;j < navLi.length ; j++){
        (function(j){
            navLi[j].addEventListener("click",function(){
                z = j;
                var self = this;
                container.style.webkitTransform = "translate3d(0,-"+h*j+"%,0)";
                container.style.mozTransform = "translate3d(0,-"+h*j+"%,0)";
                container.style.transform = "translate3d(0,-"+h*j+"%,0)";

                container.style.webkitTransition = "all 0.3s";
                container.style.mozTransition = "all 0.3s";
                container.style.transition = "all 0.3s";
            });
        })(j);
    }
    //inf
    function infData(inflist){
        var autoIntervals;
        var itemcls = "itemcls_";
        var template = '';
        var box = $(".inf_con",".resume_inf");
        for(var a = 0;a<inflist.length; a++){
            template = template+'' +
                '<div class="'+itemcls+a+' inf_template" style="top:'+inflist[a].y+';left:'+inflist[a].x+';width:'+inflist[a].width+';height:'+inflist[a].height+';background-color:'+inflist[a].backgroundColor+'">' +
                    '<div class="title">'+inflist[a].title+'</div>' +
                    '<div class="content">'+inflist[a].content+'</div>' +
                '</div>';
        }
        $(template).appendTo(box);
        var temp = $(".inf_template");
        temp.first().addClass("on");
        var isDisabled = false;

        $(".resume_inf").on("mouseover",".inf_template",function(){
            $(this).addClass("on").siblings().removeClass("on");
            isDisabled = true;
            clearInterval(autoIntervals);
        }).on("mouseout",".inf_template",function(){
            var index = $(this).index();
            autoIntervals = setInterval(function(){
                funcs();
            },1000);
            function funcs(){
                index++;
                if(index == inflist.length){
                    index = 0;
                }
                temp.removeClass("on");
                temp.eq(index).addClass("on");
            }
        });

        var sNum = 0;
        function func(){
            if(isDisabled)return;
            sNum++;
            if(sNum == inflist.length){
                sNum = 0;
            }
            temp.removeClass("on");
            temp.eq(sNum).addClass("on");
        }
        autoInterval();
        function autoInterval(){
            setInterval(function(){
                func();
            },1000);
        }
    };
    //pie-chart
    mycanvasGraph();
    function mycanvasGraph(){
        var mycanvas = document.getElementById("mycanvas");
        var mycanvastext = mycanvas.getContext("2d");
        var deg = Math.PI/180;

        var arr = [
            {x:"150",y:"150",r:"150",startdeg:"0",enddeg:"90",rate:"25%",fillColor:"#c00",fontColor:"#fff"},
            {x:"150",y:"150",r:"150",startdeg:"90",enddeg:"180",rate:"15%",fillColor:"#000",fontColor:"#fff"},
            {x:"150",y:"150",r:"150",startdeg:"180",enddeg:"270",rate:"35%",fillColor:"#f00",fontColor:"#fff"},
            {x:"150",y:"150",r:"150",startdeg:"270",enddeg:"360",rate:"45%",fillColor:"#f60",fontColor:"#fff"}
        ];
        for(var i = 0;i<arr.length;i++){
            mycanvastext.beginPath();
            mycanvastext.arc(arr[i].x,arr[i].y,arr[i].r,arr[i].startdeg*deg,arr[i].enddeg*deg);
            mycanvastext.lineTo(arr[i].x,arr[i].y);
            mycanvastext.fillStyle = ""+arr[i].fillColor+"";
            mycanvastext.fill();
            mycanvastext.textAlign = "center";
            var mygradient = mycanvastext.createLinearGradient(0,0,mycanvas.width,0);
            mygradient.addColorStop(1,""+arr[i].fontColor+"");
            mycanvastext.fillStyle = mygradient;

            //text 坐标
            var lx;
            var ly;
            var radian;//弧度
            radian = 2*Math.PI/360*(arr[i].enddeg*deg-arr[i].startdeg*deg)/2;

            lx = Math.cos(radian)*arr[i].r;
            ly = Math.sin(radian)*arr[i].r;
            console.log("Math.cos(radian)=",Math.cos(radian),"Math.sin(radian)=",Math.sin(radian));
            console.log("lx=",lx,"ly=",ly);

            mycanvastext.fillText(""+arr[i].rate+"",parseInt(arr[i].x)+lx ,parseInt(arr[i].y)+ly,100);
            mycanvastext.closePath();
        }

        /*mycanvastext.arc(150,150,150,deg*45,deg*135);
         mycanvastext.lineTo(150,150);
         mycanvastext.fillStyle = "#c00";
         mycanvastext.fill();
         mycanvastext.font = "1.4rem Arial";
         mycanvastext.textAlign = "center";
         var mygradient = mycanvastext.createLinearGradient(0,0,mycanvas.width,0);
         mygradient.addColorStop(1,"#fff");
         mycanvastext.fillStyle = mygradient;
         mycanvastext.fillText("25%",mycanvas.width/2,mycanvas.height,100);*/








    }

    /*移动端滚屏
    var domY = 0
        ,startY = 0
        ,moveY = 0
        ,endY = 0;
    container.addEventListener("touchstart",function(e){
        startY = e.touches[0].pageY;
        container.style.webkitTransition = "all 0s";
        container.style.transition = "all 0s";
    })
    container.addEventListener("touchmove",function(e){
        e.preventDefault();
        moveY = e.touches[0].pageY - startY;
        moveFun(domY+moveY);
        console.log(moveFun(domY+moveY));
    });
    function moveFun(y){
        container.style.webkitTransform = "translate3d(0,-"+y+"%,0)";
        container.style.transform = "translate3d(0,-"+y+"%,0)";
    }
    var sNum = 0;
    container.addEventListener("touchend",function(){
        sNum++;
        domY=h*sNum;
        console.log(domY);
        container.style.webkitTransform = "translate3d(0,-"+domY+"%,0)";
        container.style.transform = "translate3d(0,-"+domY+"%,0)";
        container.style.transition = "all 0.3s";
    });*/
