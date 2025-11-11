import { Theme } from "@radix-ui/themes"
import { AdaptersProvider } from "@/shared/adapters/core/ui"

function App() {
  return (
    <Theme accentColor="green" grayColor="olive">
      <AdaptersProvider/>
    </Theme>
  )
}

export default App
