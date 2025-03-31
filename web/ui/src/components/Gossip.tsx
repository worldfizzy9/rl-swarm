import { onMount, createEffect } from "solid-js"
import { useSwarm } from "../SwarmContext"
import SectionHeader from "./SectionHeader"
import LoadingSpinner from "./LoadingSpinner"

export default function Gossip() {
	const ctx = useSwarm()

	let containerRef: HTMLDivElement | undefined

	const scrollToBottom = () => {
		if (containerRef) {
			// Use requestAnimationFrame to ensure DOM has updated
			// Ensures we scroll after the browser paints new content
			requestAnimationFrame(() => {
				containerRef!.scrollTop = containerRef!.scrollHeight
			})
		}
	}

	onMount(() => {
		scrollToBottom()
	})

	createEffect(() => {
		// @ts-expect-error - Intentionally unused variable
		const _ = ctx.gossipMessages()
		scrollToBottom()
	})

	const GossipTooltip = () => {
		return (
			<div class="uppercase">
				Gossip shows the outputs from the agents throughout the game, including their responses to 
				the dataset prompts and to each other.
			</div>
		)
	}

	const reAnswer = new RegExp(/\.\.\.Answer:.+$/)
	const reMajority = new RegExp(/\.\.\.Majority:.+$/)
	const reIdentify = new RegExp(/\.\.\.Identify:.+$/)

	const processMessage = (message: string) => {
		// Replace each pattern with a bold version
		return message
			.replace(reAnswer, (match) => `<strong>${match}</strong>`)
			.replace(reMajority, (match) => `<strong>${match}</strong>`)
			.replace(reIdentify, (match) => `<strong>${match}</strong>`)
	}

	return (
		<section class="flex flex-grow flex-col gap-2">
			<SectionHeader title="gossip" tooltip={GossipTooltip()} />

			<div ref={containerRef} class="overflow-scroll overflow-x-hidden flex-grow min-h-0 max-h-[300px]" id="gossip-container">
				<ul class="list-none">
					{ctx.gossipMessages().length > 0 ? (
						ctx.gossipMessages().map((msg) => {
							return (
								<li class="mt-4">
									<NodeMessage id={msg.node} message={processMessage(msg.message)} />
								</li>
							)
						})
					) : (
						<span>
							<LoadingSpinner message="Fetching gossip..." />
						</span>
					)}
				</ul>
			</div>
		</section>
	)
}

function NodeMessage(props: { id: string; message: string }) {
	return (
		<div class="flex flex-col">
			<div class="flex-none">
				<span class="uppercase tracking-tightest text-xs tracking-[-0.25em]">{props.id}</span>
			</div>
			<div class="flex-none mt-1" innerHTML={props.message} />
		</div>
	)
}
