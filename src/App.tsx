import { Theme } from "@radix-ui/themes";
import { AdaptersProvider } from "@/shared/adapters/core/ui";

function App() {
	return (
		<Theme accentColor="indigo" grayColor="slate">
			<AdaptersProvider />
		</Theme>
	);
}

export default App;
