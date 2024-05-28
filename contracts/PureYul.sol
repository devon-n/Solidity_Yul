
object "PureYul" {
    code {
        // constructor
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return (0, datasize("runtime"))

    }

    object "runtime" {
        code {
            switch getSelector()
            case 0x7eed0172 /* myFunc() */ {
                mstore(0, 4) // In location 0 store the value 4
                return (0, 0x20) // Return everything in the first 32 bytes (0x20)
            }
            default {
                revert(0,0)
            }

            // Helpers

            function getSelector() -> selector {
                selector := div(calldataload(0), 0x100000000000000000000000000000000000000000000000000000000)
            }
        }
    }
}