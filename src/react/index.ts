import { useState, useCallback, RefCallback } from "react"
import autoAnimate, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
  AnimationController,
} from "../index"

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export function useAutoAnimate<T extends Element>(
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): [RefCallback<T>, (enabled: boolean) => void] {
  const [controller, setController] = useState<
    AnimationController | undefined
  >()

  const element = useCallback(
    (node: T) => {
      if (controller && node instanceof HTMLElement) {
        setController(autoAnimate(node, options))
      }
    },
    [options]
  )

  const setEnabled = useCallback(
    (enabled: boolean) => {
      if (controller) {
        enabled ? controller.enable() : controller.disable()
      }
    },
    [controller]
  )

  return [element, setEnabled]
}
