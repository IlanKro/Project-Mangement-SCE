window.onload=function(){
    auth.onAuthStateChanged(function(user) {
        if (user
          && auth.currentUser )
            document.getElementById("welcome").innerHTML = "Logged in as : " + auth.currentUser.displayName
        else
            window.location= "/"
    })
}


/*
  //console.log(reviews[0].data().student_id.path.substring("users/".length))

 */
/*
//path,attr
//ref.path

function refAttr(libraries)
{
/*
for (var i=0;i<db.length;i++) {
  if (id == db[i].id)
  for (var i=0;i<db.length;i++) {
    if (id == Users[i].id) %>
       <%=users[i].data().fname %> <%
   }

   */

//}
