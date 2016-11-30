   /* globals jsonRequester $ */

   $(() => {
       $('#btn-sign-out').click(() => {
           jsonRequester.send('post', 'sign-out');
       });
   });