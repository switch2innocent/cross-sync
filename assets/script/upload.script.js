$(document).ready(function () {
  $("#upload-form").on("submit", function (e) {
    e.preventDefault();

    // TODO: Get file inputs
    var inventoryData = $("#upload-inventoryData")[0].files[0];
    var centralWarehouse = $("#upload-centralWarehouse")[0].files[0];
    // ? var bomData = $('#upload-bomData')[0].files[0];

    // ! validate files
    if (
      inventoryData &&
      centralWarehouse &&
      inventoryData.name === centralWarehouse.name
    ) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "You have selected the same file for both uploads. Please choose different files.",
        showConfirmButton: true,
        confirmButtonColor: "#28a745",
      });
      return;
    } else if (!inventoryData || !centralWarehouse) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please select both files for upload.",
        showConfirmButton: true,
        confirmButtonColor: "#28a745",
      });

      return;
    } else {

      // TODO: Create FormData object to hold the files
      var formData = new FormData();
      formData.append("upload-inventoryData", inventoryData);
      formData.append("upload-centralWarehouse", centralWarehouse);
      // ? formData.append('upload-bomData', bomData);

      $.ajax({
        type: "POST",
        url: "controls/upload_add.ctrl.php",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function () {

          Swal.fire({
            title: "Uploading...",
            text: "Please wait while your files are being uploaded.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

        },
        complete: function () {

          Swal.fire({
            title: "Saved!",
            text: "Saved successfully!",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: "#28a745",
          }).then(function () {
            location.reload();
          });

          $("#uploadModal").modal("hide");
          1;

        },
        error: function (xhr, status, error) {

          Swal.fire({
            icon: "error",
            title: "Upload Failed!",
            text: "There was an error while uploading your file. Please try again.",
            showConfirmButton: true,
            confirmButtonColor: "#28a745",
          });

        },

      }); // ! End for upload statement
    } // ! End for validation
  }); // ! End of upload form

  // TODO: Create buttons for upload and export
  new DataTable("#upload-datatable", {
    layout: {
      topStart: {
        buttons: [
          {
            text: '<i class="fas fa-plus"></i> &nbsp; Add File',
            action: function (e, dt, node, config) {
              // ! Trigger the upload modal to open
              var uploadModal = new bootstrap.Modal(
                document.getElementById("uploadModal")
              );
              uploadModal.show();
            },
          },
          {
            extend: "csv",
            text: '<i class="fas fa-file-csv"></i> &nbsp; Download',
          },
          {
            text: '<i class="fas fa-search"></i> &nbsp; Search Date',
            action: function (e, dt, node, config) {
              // ! Trigger the search modal to open
              var searchModal = new bootstrap.Modal(
                document.getElementById("searchModal")
              );
              searchModal.show();
            },
          },
        ],
      },
    },
    "order": [[4, 'asc']],  // Set the date column (index 4) to sort ascending by default
    "columnDefs": [
      {
        "targets": 4,  // Date column index
        "render": function (data, type, row) {
          if (type === 'sort') {
            return new Date(data).getTime();
          }
          return data;
        }
      }
    ]
  }); // ! End for upload and export button

  // TODO: Search datatable by date
  var table = $("#upload-datatable").DataTable();
  // ? Date range filter logic
  $("#start-date, #end-date").change(function () {
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();

    // ? Perform the search when both dates are provided
    table.draw();
  });

  // ? Custom filter function
  $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var date = data[4]; // ! Date column (adjust if your date is in a different column)

    if (startDate && endDate) {
      return (
        new Date(date) >= new Date(startDate) &&
        new Date(date) <= new Date(endDate)
      );
    }
    return true; // ! No filter if no date range selected
  });

  // TODO: Show file name when browse
  $(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  }); // ! End for show file name

  // Loader page
  $('.logout').click(function (e) {
    e.preventDefault();
    var linkLocation = this.href;
    $('#loading-screen').fadeIn(500, function () {
      window.location = linkLocation;
    });
  });

  //Get User Profile
  $('#editProfile').on('click', function (e) {
    e.preventDefault();

    var id = $(this).val();

    $.ajax({
      type: 'POST',
      url: 'controls/edit_profile.ctrl.php',
      data: { id: id },
      success: function (response) {
        $('#editProfileModal').modal('show');
        $('#editProfileBody').html(response);
      }
    });
  });

  $('#up_profile').on('click', function (e) {
    e.preventDefault();

    var id = $('#up_id').val();
    var firstname = $('#up_fname').val();
    var lastname = $('#up_lname').val();
    var password = $('#up_pass').val();
    var conpassword = $('#up_repass').val();

    if (firstname == "" || lastname == "" || password == "" || conpassword == "") {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please fill all fields!',
        showConfirmButton: true,
        confirmButtonColor: '#28a745'
      });

    } else if (password !== conpassword) {

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Password does not match!',
        showConfirmButton: true,
        confirmButtonColor: '#28a745'
      });

    } else {

      $.ajax({
        type: 'POST',
        url: 'controls/update_profile.ctrl.php',
        data: {
          id: id,
          firstname: firstname,
          lastname: lastname,
          password: password
        },
        success: function (r) {

          if (r > 0) {
            Swal.fire({
              title: "Profile Updated!",
              text: "Your profile has been updated successfully. You will be logged out to save changes.",
              icon: "success",
              showConfirmButton: true,
              confirmButtonColor: "#28a745",
              allowOutsideClick: false
            }).then(function () {
              window.location.href = 'controls/logout_user.ctrl.php';
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to update profile!',
              showConfirmButton: true,
              confirmButtonColor: '#28a745'
            });
          }
        },
        error: function () {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while updating profile!',
            showConfirmButton: true,
            confirmButtonColor: '#28a745'
          });
        }
      });
    }

  });

}); // ! End document ready function