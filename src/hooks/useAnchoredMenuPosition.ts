import { useLayoutEffect, type RefObject } from 'react'

const GAP = 6
const VIEWPORT_PAD = 8

/** Pins a flyout menu to the trigger with fixed positioning (avoids header/grid clipping). */
export function useAnchoredMenuPosition(
  open: boolean,
  triggerRef: RefObject<HTMLElement | null>,
  menuRef: RefObject<HTMLElement | null>,
): void {
  useLayoutEffect(() => {
    const trigger = triggerRef.current
    const menu = menuRef.current
    if (!open || !trigger || !menu) {
      if (menu) {
        menu.style.position = ''
        menu.style.top = ''
        menu.style.left = ''
        menu.style.right = ''
        menu.style.bottom = ''
      }
      return
    }

    function place() {
      const tr = trigger!.getBoundingClientRect()
      menu!.style.position = 'fixed'
      menu!.style.right = 'auto'
      menu!.style.bottom = 'auto'

      let top = tr.bottom + GAP
      let left = tr.left
      menu!.style.top = `${top}px`
      menu!.style.left = `${left}px`

      let mr = menu!.getBoundingClientRect()

      if (mr.bottom > window.innerHeight - VIEWPORT_PAD) {
        top = tr.top - GAP - mr.height
        top = Math.max(VIEWPORT_PAD, top)
        menu!.style.top = `${top}px`
        mr = menu!.getBoundingClientRect()
      }

      if (mr.right > window.innerWidth - VIEWPORT_PAD) {
        left = tr.right - mr.width
        left = Math.max(VIEWPORT_PAD, left)
        menu!.style.left = `${left}px`
        mr = menu!.getBoundingClientRect()
      }

      if (mr.left < VIEWPORT_PAD) {
        menu!.style.left = `${VIEWPORT_PAD}px`
      }
    }

    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      menu.style.position = ''
      menu.style.top = ''
      menu.style.left = ''
      menu.style.right = ''
      menu.style.bottom = ''
    }
  }, [open, triggerRef, menuRef])
}
