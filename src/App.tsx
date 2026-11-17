import { profile } from './data/profile'
import { IntroSequence } from './components/motion/IntroSequence'

export default function App() {
  return <><IntroSequence /><main className="foundation"><span className="eyebrow">THE ART OF CONTROL</span><h1>{profile.name}</h1><p>Football referee · Tunisia</p></main></>
}
