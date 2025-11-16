import { Box, Card, Separator, Skeleton, Text } from "@radix-ui/themes";
import { SubHeader } from "@/shared/components";

export default function OverviewOfLoadBalancers() {
	return (
		<>
			<Box mb="6">
				<Text>
					In modern web architecture, traffic management and application
					reliability are critical to ensuring smooth user experiences,
					especially as applications grow in complexity and user base. One of
					the essential components in this architecture is the load balancer.
				</Text>
			</Box>

			<Box mb="6">
				<SubHeader>What is a Load Balancer?</SubHeader>
				<Text>
					A <b>load balancer</b> is a tool that distributes incoming network
					traffic across multiple servers. The goal is to ensure that no single
					server gets overwhelmed, optimizing resource use, minimizing response
					time, and preventing server overload. Imagine you have an e-commerce
					site with thousands of customers visiting at the same time. Instead of
					sending all those requests to one server—which might crash under the
					pressure—a load balancer directs the requests to a group of servers.
					It helps make the system <b>reliable</b>, <b>scalable</b>, and{" "}
					<b>responsive</b>.
				</Text>
			</Box>

			<Box mb="6">
				<SubHeader>Key Functions of a Load Balancer</SubHeader>
				<ol style={{ listStyle: "decimal", paddingLeft: "1rem" }}>
					<li>
						<Text>
							<b>Distribute Traffic:</b> Spreads out requests evenly across
							multiple servers to balance the load.
						</Text>
					</li>
					<li>
						<Text>
							<b>Ensure High Availability:</b> If one server fails, the load
							balancer routes traffic to a healthy server, ensuring minimal
							downtime.
						</Text>
					</li>
					<li>
						<Text>
							<b>Scalability:</b> Load balancers make it easier to scale
							applications by adding more servers to handle growing traffic.
						</Text>
					</li>
				</ol>
			</Box>

			<Box mb="6">
				<SubHeader>Why Load Balancers Matter</SubHeader>
				<Text>
					Without load balancers, web services can become overloaded, leading to
					slower response times, frequent outages, and a poor user experience.
					By intelligently routing traffic and providing failover support, load
					balancers help maintain service uptime, improve efficiency, and
					support growth.
				</Text>
			</Box>

			<Box>
				<SubHeader>Real-World Example</SubHeader>
				<Text>
					Think of Google or Amazon, which serve millions of users
					simultaneously. Load balancers ensure that the requests are spread
					evenly across hundreds or thousands of servers, helping to maintain
					high-speed, responsive experiences for users all around the world.
				</Text>
			</Box>

			<Separator size="4" my="6" />

			<Skeleton width="100%" height="400px" />

			<Separator size="4" my="6" />

			<SubHeader mb="4">Key Takeaways</SubHeader>
			<Card mb="6">
				<ul style={{ listStyle: "disc" }}>
					<li>
						<Text>
							Load balancers ensure even <b>traffic distribution</b>,{" "}
							<b>high availability</b>, and <b>scalability</b> of web
							applications.
						</Text>
					</li>
					<li>
						<Text>
							Without load balancers, high-traffic applications risk overloading
							servers and becoming unreliable.
						</Text>
					</li>
				</ul>
			</Card>

			<Text>
				In the next section, we&apos;ll dive deeper into how load balancers
				visually operate in a typical system setup and how they interact with
				servers. Stay tuned!
			</Text>
		</>
	);
}
