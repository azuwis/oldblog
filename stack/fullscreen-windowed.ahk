
; Remove/change any of these following hotkeys if you want (set them to blank)
; Ex:
; InvSlot1 = 
; InvSlot2 = 
InvSlot1 = Q
InvSlot2 =
InvSlot3 =
InvSlot4 =
InvSlot5 =
InvSlot6 =

windowName = Warcraft III	; Window to catch
toggleHotkey = ScrollLock	; Hotkey for toggeling on/off
;toggleHotkey = F12      	; Hotkey for toggeling on/off

updateInterval = 2000		; Interval in milliseconds


; Window Tools 2.00
;modified/extended by DonTomaso
;
;base coded by Netrunner
;comments, requests - antek2 at gmail.com
;2008
;
;
;



;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;	NO NEED TO CHANGE ANYTHING BELOW THIS LINE
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;


#SingleInstance force		;force a single instance
#HotkeyInterval 0		;disable the warning dialog if a key is held down
#InstallKeybdHook		;Forces the unconditional installation of the keyboard hook
;;;;#UseHook On			;might increase responsiveness of hotkeys
#MaxThreads 20			;use 20 (the max) instead of 10 threads
SetBatchLines, -1		;makes the script run at max speed
SetKeyDelay , -1, -1		;faster response (might be better with -1, 0)
Thread, Interrupt , -1, -1	;not sure what this does, could be bad for timers
SetTitleMatchMode, 3		;title Warcraft III must match exactly

#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.


; This recieves the margins on all windows.
;margin_left := DllCall("GetSystemMetrics", "UInt", 32)
;margin_right := margin_left
;margin_bottom := DllCall("GetSystemMetrics", "UInt", 33)
;margin_top := margin_bottom + DllCall("GetSystemMetrics", "UInt", 4)
;margin_top := margin_bottom

; Default capture state is on
captureState = 1


#Persistent

settimer, WC3focus, %updateInterval%

; Enable toggle hotkey
Hotkey, %toggleHotkey%, ToggleState
; Inventory hotkeys should only be enabled when the window is focused
Hotkey, IfWinActive, %windowName%
; Enable inventory hotkeys
if (InvSlot1 <> "")
	Hotkey, %InvSlot1%, Q
if (InvSlot2 <> "")
	Hotkey, %InvSlot2%, W
if (InvSlot3 <> "")
	Hotkey, %InvSlot3%, A
if (InvSlot4 <> "")
	Hotkey, %InvSlot4%, S
if (InvSlot5 <> "")
	Hotkey, %InvSlot5%, Z
if (InvSlot6 <> "")
	Hotkey, %InvSlot6%, X
Hotkey, #k, Killwar3

return

; This defines every hotkey action
Q:
send, {Numpad7}
return
W:
send, {Numpad8}
return
A:
send, {Numpad4}
return
S:
send, {Numpad5}
return
Z:
send, {Numpad1}
return
X:
send, {Numpad2}
return
Killwar3:
WinClose, A
return

ToggleState:
;DllCall("ClipCursor", "UInt", 0)	; Unclip the cursor
if (captureState = 1)
{
	captureState = 0
} else {
	captureState = 1
}
return


WC3focus:
	if (captureState = 1)
	{
		IfWinActive, %windowName%
		{
			captureState = 0
			WinSet, Style, -0xC40000, %windowName%
			;WinSet, ExStyle, 0x00040100, %windowName%
			WinMaximize, %windowName%
			;WinMove %windowName%,,0,0,A_ScreenWidth,A_ScreenHeight

			;WinGetPos, x, y, width, height, %windowName%	; Recieves window size and position

			;VarSetCapacity(rect, 4*4)			; Creates struct for the clipping rectangle
			;NumPut(x+margin_left, rect, 0, "UInt")
			;NumPut(y+margin_top, rect, 4, "UInt")
			;NumPut(x+width-margin_right, rect, 8, "UInt")
			;NumPut(y+height-margin_bottom, rect, 12, "UInt")

			;DllCall("ClipCursor", "UInt", &rect)		; Clip the cursor
		} else {
			; The cursor is automatically unclipped for some reason
		}
	}
return