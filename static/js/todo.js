$(document).ready(function () {
    // Function to load todo items using AJAX
    function loadTodos() {
        $.ajax({
            url: "/api/todos/",
            type: "GET",
            success: function (data) {
                buildTodoList(data)
            },
        });
    }

    function buildTodoList(data) {
        $("#incomplete-tasks").empty();
        $("#completed-tasks").empty();


        // Loop through retrieved todo items and add them to the list
        for (var i = 0; i < data.length; i++) {
            var todoItem = data[i];
            console.log(todoItem);

            title = todoItem.title.charAt(0).toUpperCase() + todoItem.title.slice(1);
            var listItem =
                `<li class="list-group-item m-2 rounded d-flex align-items-start ${todoItem.task_priority == 0 ? "list-group-item-warning" : (todoItem.task_priority == 1 ? "list-group-item-primary" : "list-group-item-danger")}"><input class="complete mt-2" type="checkbox" data-id="${todoItem.id}" ${(todoItem.completed ? "checked" : "")}><span class="mx-2 d-inline-block text-truncate" style="max-width:100px">${title}</span> 
                <div class="position-relative w-100">
                <div class="position-absolute d-flex end-0"><span class="edit update" data-id="${todoItem.id}"><i class="bi bi-pencil-square"></i></span>&nbsp<span class="delete ml-2" data-id="${todoItem.id}"><i class="bi bi-trash"></i></span></div>
                </div>
                </li>`;

            if (todoItem.completed === true) {
                $("#completed-tasks").append(listItem);
            } else {
                $("#incomplete-tasks").append(listItem);
            }
        }
    }

    // Load todo items on page load
    loadTodos();


    function getTodo(todoId) {
        $.ajax({
            url: "/api/todos/" + todoId + "/",
            type: "GET",
            success: function (data) {
                console.log("data", data)
                $("#update_task_priority").val(data.task_priority);
                $("#update_task_title").val(data.title);
                $("#update_btn").val(data.id);
            },
        });
    }

    // Handle form submission using AJAX
    $("#todo-form").submit(function (event) {
        console.log("todo-form");
        event.preventDefault();
        var formData = $(this).serialize();
        console.log("formData", formData);
        $.ajax({
            url: "/api/todos/",
            type: "POST",
            data: formData,
            success: function () {
                // Reload todo items after successful creation
                loadTodos();
                // Clear the form input field
                $("#new-task").val("");

                // Clear the
                $(".btn-close").click();
            },
        });
    });

    // Handle click event for completing a task
    $("#incomplete-tasks").on("click", ".complete", function (event) {
        console.log("complete");
        event.preventDefault();
        var todoId = $(this).data("id");
        $.ajax({
            url: "/api/todos/" + todoId + "/",
            type: "PATCH",
            data: {
                completed: true,
            },
            success: function () {
                // Reload todo items after successful update
                loadTodos();
            },
        });
    });

    $("#completed-tasks").on("click", ".complete", function (event) {
        console.log("complete");
        event.preventDefault();
        var todoId = $(this).data("id");

        $.ajax({
            url: "/api/todos/" + todoId + "/",
            type: "PATCH",
            data: {
                completed: false,
            },
            success: function () {
                // Reload todo items after successful update
                loadTodos();
            },
        });
    });

    // Handle click event for updating a task
    $("#incomplete-tasks , #completed-tasks").on(
        "click",
        ".update",
        function (event) {
            event.preventDefault();



            var todoId = $(this).data("id");
            data = getTodo(todoId)
            console.log("data: ", data);


            $(".updateButton").click();

        }
    );

    // Handle click event for deleting a task
    $("#incomplete-tasks , #completed-tasks").on(
        "click",
        ".delete",
        function (event) {
            console.log("delete task");

            event.preventDefault();
            var todoId = $(this).data("id");
            if (confirm("Are you sure you want to delete this task?")) {
                $.ajax({
                    url: "/api/todos/" + todoId + "/",
                    type: "DELETE",
                    success: function () {
                        // Reload todo items after successful deletion
                        loadTodos();
                    },
                });
            }
        }
    );

    $("#update_btn").on("click", function (event) {

        var todoId = $(this).val()
        var newTitle = $("#update_task_title").val()
        var newPriority = $("#update_task_priority").val()

        // console.log("update_btn click", todoId);

        if (newTitle !== null) {
            $.ajax({
                url: "/api/todos/" + todoId + "/",
                type: "PATCH",
                data: {
                    title: newTitle,
                    task_priority: newPriority,
                },
                success: function () {
                    // Reload todo items after successful update
                    loadTodos();
                    $(".btn-close").click();
                },
            });
        }
    }
    );

    $('#live-search').on('keyup', function () {
        console.log("change111", $('#live-search').val());

        var search_term = $('#live-search').val()
        $.ajax({
            url: "/api/todos/search/?q=" + search_term,
            type: "GET",
            success: function (data) {
                buildTodoList(data)
            },
        });



    });

});