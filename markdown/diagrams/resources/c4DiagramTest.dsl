workspace {

    model {
        user = person "User"
        softwareSystem = softwareSystem "Software System1" {
        }

        user -> softwareSystem "Uses"
    }

    views {
        systemContext softwareSystem "Diagram1" {
            include *
            autoLayout
        }

        theme default
    }

}
