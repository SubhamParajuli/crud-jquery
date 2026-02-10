function renderItem() {
    $("#items").empty();

    if (items.length === 0) {
        $("#empty-state")
            .css("display", "flex")
            .css("flex-direction", "column");
        return;
    }

    $("#empty-state").hide();

    $.each(items, function (idx, item) {

        const $container = $("<div>", {
            class: "item-container",
            id: `item-${idx}`
        });

        const $text = $("<p>", {
            class: "item-text",
            text: item
        });


        const $buttonGroup = $("<div>", {
            class: "button-group"
        });

        const $editButton = $("<button>", {
            class: "edit-btn",
            html: '<i class="fas fa-edit"></i> Edit'
        }).on("click", function () {
            startEdit(idx);
        });

        const $deleteButton = $("<button>", {
            class: "delete-btn",
            html: '<i class="fas fa-trash"></i> Delete'
        }).on("click", function () {
            removeItems(idx);
        });

        $buttonGroup.append($editButton, $deleteButton);
        $container.append($checkButton, $text, $buttonGroup);

        $("#items").append($container);
    });
}


// Start Edit function

function startEdit(idx) {
    editingIndex = idx;

    const $container = $(`#item-${idx}`);
    const $textElement = $container.find(".item-text");
    const $buttonGroup = $container.find(".button-group");

    const $editInput = $("<input>", {
        type: "text",
        class: "edit-input",
        value: items[idx]
    });

    const $saveButton = $("<button>", {
        class: "save-btn",
        html: '<i class="fas fa-check"></i> Save'
    }).on("click", function () {
        saveEdit(idx, $editInput.val());
    });

    const $cancelButton = $("<button>", {
        class: "cancel-btn",
        html: '<i class="fas fa-times"></i> Cancel'
    }).on("click", function () {
        cancelEdit();
    });

    const $actionGroup = $("<div>", {
        class: "action-group"
    }).append($saveButton, $cancelButton);

    $textElement.hide();
    $buttonGroup.hide();

    $container.append($editInput, $actionGroup);

    $editInput.focus().select();

    $editInput.on("keydown", function (e) {
        if (e.key === "Enter") {
            saveEdit(idx, $(this).val());
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    });
}

function saveEdit(idx, newValue) {
    const trimmedValue = $.trim(newValue);

    if (!trimmedValue) {
        alert("Task cannot be empty!");
        return;
    }

    items[idx] = trimmedValue;
    editingIndex = null;

    renderItem();
    saveItems();
}

function cancelEdit() {
    editingIndex = null;
    renderItem();
}

function addItem() {
    const value = $.trim($("#ItemInput").val());

    if (!value) {
        alert("You cannot add an empty task!");
        return;
    }

    items.push(value);
    renderItem();

    $("#ItemInput").val("");
    saveItems();
}