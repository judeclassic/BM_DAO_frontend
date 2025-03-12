import { useRaiderTaskFeature } from "@/lib/hooks/moderator/raider-task"

const RaidTaskHandler = () => {
    const { raids } = useRaiderTaskFeature();

    return (<>
        {/* {raids} */}
    </>)

}

export default RaidTaskHandler;