$(document).ready(function () {
    $(".delete-burger").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger!", id);
                location.reload();
            }
        );
    });

    $(".devour-burger").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var user = $("#user-" + id).val();
        console.log(user);
        var objColVals = {
            user: user,
            id: id,
            devoured: true
        };
        console.log(id);
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: objColVals
        }).then(
            function () {
                console.log("devoured burger!", id);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#newBurger").val().trim()
        };
        console.log("NEW BURGER!!!!!!!!!", newBurger);
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("served up a new burger!", newBurger.burger_name);
                location.reload();
            }
        );
    })
})