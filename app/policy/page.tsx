export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container-wrapper py-[5vw]">
        <div className="card mx-auto">
          <h1 className="font-bold text-primary mb-[3vw] text-center">サイトポリシー</h1>
          <div className="space-y-[2vw]">
            <section>
              <h2 className="font-bold text-primary mb-[1vw]">利用規約</h2>
              <p className="text-primary">本サイトは学習目的で作成されています。</p>
            </section>
            <section>
              <h2 className="font-bold text-primary mb-[1vw]">プライバシーポリシー</h2>
              <p className="text-primary">個人情報の取り扱いについて記載予定。</p>
            </section>
            <section>
              <h2 className="font-bold text-primary mb-[1vw]">お問い合わせ</h2>
              <p className="text-primary">お問い合わせ先情報を記載予定。</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}