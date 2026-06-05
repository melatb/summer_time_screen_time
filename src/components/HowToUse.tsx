interface Props {
  onClose: () => void
}

export function HowToUse({ onClose }: Props) {
  return (
    <div className="howto-overlay">
      <div className="howto-card">
        <div className="howto-header">
          <p className="howto-title">how to use your app</p>
          <p className="howto-sub">takes about 5 minutes to set up!</p>
        </div>

        <div className="wave-strip" style={{ margin: '0 0 1rem' }} />

        <div className="howto-steps">
          <div className="howto-step">
            <div className="howto-num n1">1</div>
            <div>
              <p className="howto-step-title">open the app with your parent</p>
              <p className="howto-step-desc">this part you do together — just once at the start of summer.</p>
            </div>
          </div>

          <div className="howto-step">
            <div className="howto-num n2">2</div>
            <div>
              <p className="howto-step-title">tap what matters to you</p>
              <p className="howto-step-desc">on the "our agreement" tab, tap the activities you actually care about. the ones you tap shape your plan — <span className="howto-tag t-aqua">free flow</span> means no timer, <span className="howto-tag t-pink">my limit</span> means you set your own time.</p>
            </div>
          </div>

          <div className="howto-step">
            <div className="howto-num n3">3</div>
            <div>
              <p className="howto-step-title">fill in your limits</p>
              <p className="howto-step-desc">for games and youtube, type how much time you want to give yourself. for bedtime, write when screens go off. this is your call — not your parent's.</p>
            </div>
          </div>

          <div className="howto-step">
            <div className="howto-num n4">4</div>
            <div>
              <p className="howto-step-title">both sign it and save</p>
              <p className="howto-step-desc">type your name, your parent types theirs, then hit the pink "sign & save" button. done! you only do this once.</p>
            </div>
          </div>

          <div className="howto-step">
            <div className="howto-num n5">5</div>
            <div>
              <p className="howto-step-title">check in every week — on your own</p>
              <p className="howto-step-desc">tap "weekly check-in" each week and check off what's true. takes 2 minutes. there's a box to write anything you want to talk about too.</p>
            </div>
          </div>
        </div>

        <div className="howto-weekly">
          <p className="howto-weekly-title">every week, ask yourself:</p>
          <div className="howto-weekly-item"><span className="howto-dot" />did I do the things I care about offline?</div>
          <div className="howto-weekly-item"><span className="howto-dot" />did screens feel fun, or kind of draining?</div>
          <div className="howto-weekly-item"><span className="howto-dot" />is there anything I want to change?</div>
        </div>

        <p className="howto-note">
          you can always update your agreement with your parent<br />
          if something stops working — that's not failing, that's just life.
        </p>

        <button className="save-btn" onClick={onClose} style={{ marginTop: '1.25rem' }}>
          got it — let's go!
        </button>
      </div>
    </div>
  )
}
