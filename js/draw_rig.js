

window.loadedImages = {};
window.canvas = {};
window.draw_initialized = 0;
window.rigcount = 0;


function animationFrame() {
    let resolve = null
    const promise = new Promise(r => resolve = r)
    window.requestAnimationFrame(resolve)
    return promise
}


async function draw_img(canvas,src,Dx,Dy,render = 0)
{
        await animationFrame();

        if(typeof window.loadedImages[src] !== 'undefined')
        canvas.drawImage(window.loadedImages[src], Dx, Dy);

       if(render==1)
        {
          generate_image();
        }

}

function generate_image()
{

        // FULL QUALITY!
       // var dataURL = window.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 

        //OPTIMIZED
           var dataURL = window.canvas.toDataURL("image/jpeg",0.5); 

       // console.log(dataURL);
       // window.location.href=dataURL; 

          $("#random_rig").attr('src', dataURL);

        
          /*   SAVE IMG!
          var image_name = window.parts_array.join("");

          $.post("api.php",
            {
              image: dataURL,
              name: window.parts_array.join("")
            },
        function(data,status){
          $("#all_rigs").html(data);
          $("#download").attr("href", "content/"+image_name+".jpg");
          window.rigcount += 1;
          history.pushState({
            id: 'homepage'
              }, 'Home | My App', location.protocol + '//' + location.host + location.pathname+'/rig/'+image_name);
            });*/

}




  function draw_rig(parts_array) // 23 Step to generate!
  {
          
      rigdraw_canvas.clearRect(0, 0, canvas.width, canvas.height);

        render_step = 22; 

        for (let index = 0; index < 23; index++) 
        {

            if(index == 0 || index == 4 || index == 14) // Add Frame
            {

              for (let i=0 ; i < parts.length ; i++)
                {
                  if(parts[i]['id']==parts_array[0])
                  {
                    if(index == 0){
                    let random_background = random_parts(5);  
                    add_part(23,parts[random_background]['img0']); // Random Background!    
                    add_part(index,parts[i]['img0']);
                    }else if(index == 4){
                    add_part(index,parts[i]['img1']); 
                    }
                    else if(index == 14){
                    add_part(index,parts[i]['img2']); 
                    }

                  }
                }
            }

            if(index == 1) // Add Motherboard
            {
              for (let i=0 ; i < parts.length ; i++)
                {
                  if(parts[i]['id']==parts_array[1])
                  {
                    add_part(index,parts[i]['img0']);
                  }
                }
            }

            if(index == 2) // Add Power Supply
            {
              for (let i=0 ; i < parts.length ; i++)
                {
                  if(parts[i]['id']==parts_array[2])
                  {
                    add_part(index,parts[i]['img0']);
                  }
                }
            }

            if(index >= 5 && index<=13) // Start GPU
            {
              for (let i=0 ; i < parts.length ; i++)
                {
                  if(parts[i]['id']==parts_array[index-2])
                  {
                    add_part(index,parts[i]['img0']);
                  }
                }
            }

            if(index >= 15) // Start GPU TOP
            {
              for (let i=0 ; i < parts.length ; i++)
                {
                  if(parts[i]['id']==parts_array[index-12])
                  {
                    if(render_step==index)
                    {
                      add_part(index,parts[i]['img1'],1);
                    }
                    else
                    {
                      add_part(index,parts[i]['img1']);  
                    }
                  }
                }
            }

            if(index==render_step)
            {
              add_part(0,0,1); 
            }    

        }
  }


async function add_part(step,src,render = 0)
{
    await animationFrame();

    Dx = 0;
    Dy = 50;

        if(step==23) // Background!
        {
          Dy = 0; 
        }

        if(step>=5 && step<=13) //GPU HELP
        {
          count = 12-step; // Fill it up in descenting order
          Dx += -72*count;
          Dy += -42*count;
        } 
        else if(step>=15 && step<=22) //GPU HELP
        {
          count = 22-step; // Fill it up in descenting order
          Dx += -72*count;
          Dy += -42*count;
        } 

      if(render == 1) // render
      { 
        draw_img(rigdraw_canvas,src,Dx,Dy,1);
        return;
      }
      else
      {
        draw_img(rigdraw_canvas,src,Dx,Dy); // Put Image on the Canvas
        return;
      }

}


function init()
{

        canvas = document.createElement("canvas",{"id":"rig_draw2"});
        canvas.width = 1180;
        canvas.height = 1180;
        rigdraw_canvas = canvas.getContext("2d");   

     
        var promise = new Promise(r => resolve = r);

        load_images(function(images)
                  {
                            window.promiseArray = images.map(function(imgurl){
                            var prom = new Promise(function(resolve,reject){
                                var img = new Image();
                                img.onload = function(){
                                  window.loadedImages[imgurl] = img;
                                    resolve();
                                };
                                img.src = imgurl;
                            });
                            return prom;
                            });

                                Promise.all(window.promiseArray).then(function(){
                                  window.draw_initialized = 1;
                                  draw_random_rig();
                                  return promise;
                                }   
                          );

                  });

}

function load_images(callback)
{
        var images = [];

        for (let i=0 ; i < parts.length ; i++)
        {
          for (let k=0 ; k < 3; k++)
            {
              let field = 'img'+k;
              if(typeof parts[i][field] !== 'undefined') 
              {
                images.push(parts[i][field]);
              }
           }
        }

    return callback(images);   
}

async function draw_random_rig()
{
  
  // First Run Let's wait
        if(window.draw_initialized ==0)
        {
        await init();
        }
        else
        {
          window.parts_array = [random_parts(1),random_parts(2),random_parts(3),random_parts(4),random_parts(4,50),random_parts(4),random_parts(4,50),random_parts(4),random_parts(4,50),random_parts(4),random_parts(4,50)];

          draw_rig(parts_array);  
        }
};


// Return a Random array per given type
function random_parts(type,chancezero=0)
{
  let possible_parts = [];

  for (let index = 0; index < parts.length; index++)
  {
        if(parts[index]['type'] == type) 
        {
          possible_parts.push(parts[index]['id']);
        }
  }

    
      if(chancezero>0)
      {
        let chance = Math.floor(Math.random() *100);

        console.log(chance);

        if(chance < chancezero)
        return 0;
      }


  return possible_parts[Math.floor(Math.random() * possible_parts.length)];
}



