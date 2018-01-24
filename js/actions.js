

$(document).ready(function(){
  $("#character").click(function(){   
      // $(".pop").attr("hidden",false);
      $("#character-pop").show();
  });

  $("#character-pop-close").click(function(){   
      // $(".pop").attr("hidden",true);
      $("#character-pop").hide();
  });

  $(".character-item").click(function(e){
    let item = e.currentTarget;
    player.sprite=item.src.replace(window.location.href,'');
    $("#character-pop").hide();
  })

  $("#win-pop-close").click(function(){   
      $("#win-pop").hide();
  });
});

