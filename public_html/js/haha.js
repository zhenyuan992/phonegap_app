/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('input[type="checkbox"]').on('change', function () {
    $(this).siblings('input[type="checkbox"]').not(this).prop('checked', false);
});

