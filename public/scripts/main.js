   /* globals jsonRequester $ */

   $(() => {
       $('#btn-sign-out').click(() => {
           jsonRequester.send('post', 'sign-out')
           .then(window.location.replace('/'));

       });
   });