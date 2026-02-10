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

