import { useState, useRef, useCallback, useEffect } from "react";

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED = [
  {
    id: 1, name: "Eleanor Voss", email: "eleanor@hotel.com", role: "Super Admin",
    status: "active",
    bio: "<p>Senior administrator with <strong>8+ years</strong> in luxury hospitality. Oversees <em>all properties</em> and financial reporting.</p><ul><li>Certified Hotel Manager</li><li>Revenue optimization specialist</li></ul>",
    joined: "Jan 2023",
  },
  {
    id: 2, name: "Marcus Chen", email: "marcus@hotel.com", role: "Manager",
    status: "active",
    bio: "<p>Property manager at <strong>Palm Shore Suites</strong>. Expert in <em>guest relations</em> and operations.</p><ol><li>Manages 24 rooms</li><li>Handles OTA partnerships</li></ol>",
    joined: "Mar 2023",
  },
  {
    id: 3, name: "Isabelle Dubois", email: "isa@hotel.com", role: "Receptionist",
    status: "inactive",
    bio: "<p>Front-desk specialist fluent in <strong>French, English and Spanish</strong>. Known for <em>exceptional</em> guest onboarding.</p>",
    joined: "Jun 2023",
  },
  {
    id: 4, name: "Rafael Torres", email: "rafael@hotel.com", role: "Housekeeper",
    status: "active",
    bio: "<p>Leads the housekeeping team at <strong>Azure Cliff Villa</strong>. Maintains the highest cleanliness standards.</p>",
    joined: "Sep 2023",
  },
];

const ROLES    = ["Super Admin", "Manager", "Receptionist", "Housekeeper", "Accountant"];
const STATUSES = ["active", "inactive", "suspended"];

const ROLE_COLORS = {
  "Super Admin":  "bg-amber-900/50 text-amber-300 border-amber-600/40",
  "Manager":      "bg-violet-900/50 text-violet-300 border-violet-600/40",
  "Receptionist": "bg-sky-900/50 text-sky-300 border-sky-600/40",
  "Housekeeper":  "bg-emerald-900/50 text-emerald-300 border-emerald-600/40",
  "Accountant":   "bg-rose-900/50 text-rose-300 border-rose-600/40",
};

const STATUS_COLORS = {
  active:    "bg-emerald-900/50 text-emerald-300 border-emerald-600/40",
  inactive:  "bg-stone-700/50 text-stone-400 border-stone-600/40",
  suspended: "bg-red-900/50 text-red-300 border-red-600/40",
};

const GRADIENTS = [
  "from-amber-500 to-orange-600",
  "from-violet-500 to-purple-700",
  "from-sky-500 to-blue-700",
  "from-emerald-500 to-teal-700",
  "from-rose-500 to-pink-700",
];

const initials  = (n) => n.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const gradient  = (id) => GRADIENTS[(id - 1) % GRADIENTS.length];
const emptyUser = () => ({ name: "", email: "", role: "Receptionist", status: "active", bio: "", password: "", confirm: "" });

// ─── Rich Text Editor ─────────────────────────────────────────────────────────
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const isInit    = useRef(false);

  // Set initial HTML once
  useEffect(() => {
    if (editorRef.current && !isInit.current) {
      editorRef.current.innerHTML = value || "";
      isInit.current = true;
    }
  }, []);

  const exec = useCallback((cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const handleInput = () => onChange(editorRef.current?.innerHTML || "");

  const isActive = (cmd) => {
    try { return document.queryCommandState(cmd); } catch { return false; }
  };

  const ToolBtn = ({ cmd, val, title, children, onClick }) => {
    const active = cmd ? isActive(cmd) : false;
    return (
      <button
        type="button"
        title={title}
        onMouseDown={e => { e.preventDefault(); onClick ? onClick() : exec(cmd, val); }}
        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-150 select-none
          ${active
            ? "bg-amber-500 text-white shadow"
            : "text-stone-400 hover:bg-stone-700 hover:text-stone-200"}`}
      >
        {children}
      </button>
    );
  };

  const insertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) exec("createLink", url);
  };

  const toolGroups = [
    [
      { cmd: "bold",          title: "Bold",          children: <strong>B</strong> },
      { cmd: "italic",        title: "Italic",        children: <em>I</em> },
      { cmd: "underline",     title: "Underline",     children: <span className="underline">U</span> },
      { cmd: "strikeThrough", title: "Strikethrough", children: <span className="line-through">S</span> },
    ],
    [
      { cmd: "insertUnorderedList", title: "Bullet list",   children: "≡" },
      { cmd: "insertOrderedList",   title: "Numbered list", children: "①" },
      { cmd: "indent",              title: "Indent",        children: "→" },
      { cmd: "outdent",             title: "Outdent",       children: "←" },
    ],
    [
      { cmd: "justifyLeft",   title: "Left",   children: "⬅" },
      { cmd: "justifyCenter", title: "Center", children: "↔" },
      { cmd: "justifyRight",  title: "Right",  children: "➡" },
    ],
    [
      { title: "Link", children: "🔗", onClick: insertLink },
      { cmd: "removeFormat", title: "Clear format", children: "✕" },
    ],
  ];

  const headings = ["p", "h1", "h2", "h3"];

  return (
    <div className="border border-stone-700 rounded-xl overflow-hidden focus-within:border-amber-500 transition-colors duration-200">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-stone-800 border-b border-stone-700">
        {/* Heading select */}
        <select
          onMouseDown={e => e.stopPropagation()}
          onChange={e => { exec("formatBlock", e.target.value); e.target.value = "p"; }}
          defaultValue="p"
          className="bg-stone-700 border border-stone-600 text-stone-300 text-xs rounded-lg px-2 py-1 focus:outline-none cursor-pointer mr-1"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {/* Divider + tool groups */}
        {toolGroups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5">
            {gi > 0 && <div className="w-px h-5 bg-stone-700 mx-1" />}
            {group.map((t, ti) => (
              <ToolBtn key={ti} {...t} />
            ))}
          </div>
        ))}

        {/* Color */}
        <div className="flex items-center gap-0.5 ml-1">
          <div className="w-px h-5 bg-stone-700 mr-1" />
          <label title="Text color" className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-stone-400 hover:bg-stone-700 hover:text-stone-200 cursor-pointer transition-colors">
            A
            <input type="color" className="sr-only" onChange={e => exec("foreColor", e.target.value)} />
          </label>
          <label title="Highlight" className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-stone-400 hover:bg-stone-700 hover:text-stone-200 cursor-pointer transition-colors">
            🖊
            <input type="color" className="sr-only" onChange={e => exec("hiliteColor", e.target.value)} />
          </label>
        </div>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={e => {
          if (e.key === "Tab") { e.preventDefault(); exec("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;"); }
        }}
        className="min-h-[140px] max-h-[220px] overflow-y-auto px-4 py-3 bg-stone-900 text-stone-200 text-sm focus:outline-none
          [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-stone-100 [&_h1]:mb-2
          [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-stone-100 [&_h2]:mb-2
          [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-stone-100 [&_h3]:mb-1
          [&_strong]:text-stone-100 [&_strong]:font-bold
          [&_em]:text-stone-300 [&_em]:italic
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-0.5
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-0.5
          [&_a]:text-amber-400 [&_a]:underline
          [&_p]:leading-relaxed"
        style={{ caretColor: "#f59e0b" }}
      />
    </div>
  );
}

// ─── Atoms ────────────────────────────────────────────────────────────────────
const Avatar = ({ name, id, size = "md" }) => {
  const sz = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" }[size];
  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br ${gradient(id)} flex items-center justify-center font-bold text-white flex-shrink-0 shadow`}>
      {initials(name || "?")}
    </div>
  );
};

const Badge = ({ cls, children }) => (
  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${cls}`}>{children}</span>
);

const FormInput = ({ label, value, onChange, type = "text", placeholder, error, required }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest flex gap-1">
      {label}{required && <span className="text-amber-400">*</span>}
    </label>
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`w-full bg-stone-800 border rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600
        focus:outline-none focus:ring-1 focus:ring-amber-500/40 transition-all
        ${error ? "border-red-500/60" : "border-stone-700 focus:border-amber-500"}`}
    />
    {error && <p className="text-xs text-red-400 flex items-center gap-1"><span>⚠</span>{error}</p>}
  </div>
);

const FormSelect = ({ label, value, onChange, options, required }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest flex gap-1">
      {label}{required && <span className="text-amber-400">*</span>}
    </label>
    <div className="relative">
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="w-full appearance-none bg-stone-800 border border-stone-700 text-stone-200 text-sm rounded-xl px-4 py-2.5 pr-8
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 transition-all cursor-pointer"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs">▾</span>
    </div>
  </div>
);

// ─── Delete Modal ─────────────────────────────────────────────────────────────
const DeleteModal = ({ user, onCancel, onConfirm }) => (
  <>
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onCancel} />
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-sm p-7 shadow-2xl text-center space-y-5">
        <div className="w-16 h-16 bg-red-900/30 border border-red-700/40 rounded-2xl flex items-center justify-center text-3xl mx-auto">🗑️</div>
        <div>
          <p className="text-base font-bold text-stone-100">Delete this user?</p>
          <p className="text-sm text-stone-400 mt-1.5">
            <span className="text-stone-200 font-semibold">{user.name}</span> will be permanently removed and lose all access.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-sm font-semibold rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(user.id)}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-colors shadow">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </>
);

// ─── Slide-in Form ────────────────────────────────────────────────────────────
function SlideForm({ user, onClose, onSave }) {
  const isEdit = Boolean(user?.id);
  const [form, setForm]     = useState(isEdit ? { ...user, password: "", confirm: "" } : emptyUser());
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const set = k => v => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!isEdit && !form.password)                    e.password = "Password is required";
    if (form.password && form.password.length < 8)    e.password = "Min. 8 characters";
    if (form.password !== form.confirm)               e.confirm  = "Passwords don't match";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    setSaving(true);
    // swap setTimeout with axios call:
    // isEdit ? axios.put(`/api/users/${user.id}`, form) : axios.post('/api/users', form)
    setTimeout(() => {
      onSave({
        ...form,
        id:     isEdit ? user.id : Date.now(),
        joined: isEdit ? user.joined : new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      });
      setSaving(false);
    }, 600);
  };

  const pwStrength = () => {
    const l = form.password.length;
    if (!l) return null;
    if (l < 5)  return { label: "Weak",   bars: 1, color: "bg-red-500" };
    if (l < 8)  return { label: "Fair",   bars: 2, color: "bg-amber-400" };
    if (l < 12) return { label: "Good",   bars: 3, color: "bg-yellow-300" };
    return            { label: "Strong",  bars: 4, color: "bg-emerald-400" };
  };
  const strength = pwStrength();

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-[440px] bg-stone-950 border-l border-stone-800 z-40 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg">
              {isEdit ? "✏️" : "👤"}
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-100">{isEdit ? "Edit User" : "Add New User"}</h2>
              <p className="text-[11px] text-stone-500">{isEdit ? `Updating ${user.name}` : "Create a new staff account"}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors flex items-center justify-center text-sm">
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Current user card (edit mode) */}
          {isEdit && (
            <div className="flex items-center gap-4 p-4 bg-stone-900 border border-stone-800 rounded-2xl">
              <Avatar name={user.name} id={user.id} size="lg" />
              <div className="min-w-0">
                <p className="font-bold text-stone-100 text-sm">{user.name}</p>
                <p className="text-xs text-stone-500 truncate">{user.email}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge cls={ROLE_COLORS[user.role] ?? ""}>{user.role}</Badge>
                  <Badge cls={STATUS_COLORS[user.status] ?? ""}>{user.status}</Badge>
                </div>
              </div>
            </div>
          )}

          {/* ── Personal ── */}
          <section className="space-y-4">
            <Divider label="Personal Info" />
            <FormInput label="Full Name"     value={form.name}  onChange={set("name")}  placeholder="Jane Smith"       required error={errors.name} />
            <FormInput label="Email"         value={form.email} onChange={set("email")} placeholder="jane@hotel.com"   required error={errors.email} type="email" />
          </section>

          {/* ── Role & Status ── */}
          <section className="space-y-4">
            <Divider label="Role & Access" />
            <FormSelect label="Role"   value={form.role}   onChange={set("role")}   options={ROLES}    required />
            <FormSelect label="Status" value={form.status} onChange={set("status")} options={STATUSES} required />
          </section>

          {/* ── Bio (Rich Text) ── */}
          <section className="space-y-4">
            <Divider label="Bio / Notes" />
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                Rich Text Bio
              </label>
              <RichEditor
                key={user?.id ?? "new"}
                value={form.bio}
                onChange={set("bio")}
              />
              <p className="text-[10px] text-stone-600">Supports bold, italic, lists, headings, links & colours</p>
            </div>
          </section>

          {/* ── Password ── */}
          <section className="space-y-4">
            <Divider label={isEdit ? "Change Password" : "Set Password"} />
            {isEdit && <p className="text-xs text-stone-500 -mt-2">Leave blank to keep existing password</p>}

            {/* Password with eye toggle */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest flex gap-1">
                Password{!isEdit && <span className="text-amber-400">*</span>}
              </label>
              <div className={`flex items-center bg-stone-800 border rounded-xl overflow-hidden transition-all focus-within:ring-1 focus-within:ring-amber-500/40
                ${errors.password ? "border-red-500/60" : "border-stone-700 focus-within:border-amber-500"}`}>
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password} onChange={e => set("password")(e.target.value)}
                  placeholder={isEdit ? "Leave blank to keep" : "Min. 8 characters"}
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none"
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="pr-3 text-stone-500 hover:text-stone-300 transition-colors text-sm select-none">
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 flex items-center gap-1"><span>⚠</span>{errors.password}</p>}

              {/* Strength bar */}
              {strength && (
                <div className="space-y-1 pt-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300
                        ${i <= strength.bars ? strength.color : "bg-stone-800"}`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-stone-500">{strength.label} password</p>
                </div>
              )}
            </div>

            <FormInput label="Confirm Password" value={form.confirm} onChange={set("confirm")}
              placeholder="Re-enter password" type={showPw ? "text" : "password"}
              error={errors.confirm} required={!isEdit} />
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-sm font-semibold rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={submit} disabled={saving}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all shadow flex items-center justify-center gap-2">
            {saving
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
              : isEdit ? "Save Changes" : "Create User"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = ({ label }) => (
  <div className="flex items-center gap-2">
    <div className="h-px flex-1 bg-stone-800" />
    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest whitespace-nowrap">{label}</span>
    <div className="h-px flex-1 bg-stone-800" />
  </div>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ toast }) => {
  if (!toast) return null;
  const s = { success: "bg-emerald-900/95 border-emerald-700/50 text-emerald-200", error: "bg-red-900/95 border-red-700/50 text-red-200" };
  return (
    <div className={`fixed top-5 right-5 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-2xl border shadow-2xl text-sm font-semibold ${s[toast.type] ?? s.success}`}>
      <span>{toast.type === "error" ? "🗑️" : "✓"}</span>
      {toast.msg}
    </div>
  );
};

// ─── User Card ────────────────────────────────────────────────────────────────
const UserCard = ({ user, onEdit, onDelete }) => (
  <div className="group bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 transition-all duration-200 hover:shadow-lg hover:shadow-black/30">
    <div className="flex items-start gap-4">
      <Avatar name={user.name} id={user.id} size="lg" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-bold text-stone-100 text-sm truncate">{user.name}</p>
            <p className="text-xs text-stone-500 truncate mt-0.5">{user.email}</p>
          </div>
          {/* Action buttons — visible on hover */}
          <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(user)}
              className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-500/40 flex items-center justify-center text-stone-400 hover:text-amber-400 transition-all text-xs"
              title="Edit">✏️</button>
            <button onClick={() => onDelete(user)}
              className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-red-900/30 border border-stone-700 hover:border-red-700/40 flex items-center justify-center text-stone-400 hover:text-red-400 transition-all text-xs"
              title="Delete">🗑️</button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2 flex-wrap mt-2.5">
          <Badge cls={ROLE_COLORS[user.role] ?? ""}>{user.role}</Badge>
          <Badge cls={STATUS_COLORS[user.status] ?? ""}>{user.status}</Badge>
        </div>

        {/* Bio preview */}
        {user.bio && (
          <div
            className="mt-3 text-xs text-stone-400 leading-relaxed line-clamp-2
              [&_strong]:text-stone-300 [&_em]:italic [&_a]:text-amber-400"
            dangerouslySetInnerHTML={{ __html: user.bio }}
          />
        )}

        <p className="text-[10px] text-stone-600 mt-2.5">Joined {user.joined}</p>
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Users() {
  const [users, setUsers]     = useState(SEED);
  const [panel, setPanel]     = useState(null);   // null | "add" | user
  const [deleting, setDelete] = useState(null);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [view, setView]       = useState("grid"); // "grid" | "list"
  const [toast, setToast]     = useState(null);

  const flash = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  };

  const handleSave = (saved) => {
    setUsers(prev => {
      const exists = prev.find(u => u.id === saved.id);
      return exists ? prev.map(u => u.id === saved.id ? saved : u) : [...prev, saved];
    });
    setPanel(null);
    flash(panel && typeof panel === "object" ? "User updated successfully!" : "User created successfully!");
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setDelete(null);
    flash("User deleted", "error");
  };

  const visible = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchFilter = filter === "all" || u.status === filter || u.role.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    total:    users.length,
    active:   users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status !== "active").length,
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-8" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <Toast toast={toast} />

      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-100">User Management</h1>
            <p className="text-sm text-stone-500 mt-0.5">Manage staff accounts with rich-text bios and role access</p>
          </div>
          <button onClick={() => setPanel("add")}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-amber-900/30">
            <span className="text-lg leading-none">+</span> Add User
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total",    val: counts.total,    color: "text-stone-100" },
            { label: "Active",   val: counts.active,   color: "text-emerald-400" },
            { label: "Inactive", val: counts.inactive, color: "text-stone-400" },
          ].map(s => (
            <div key={s.label} className="bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
              <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 focus-within:border-amber-500 transition-colors">
            <span className="text-stone-500 text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name or email…"
              className="flex-1 bg-transparent text-sm text-stone-200 placeholder-stone-600 focus:outline-none" />
            {search && <button onClick={() => setSearch("")} className="text-stone-500 hover:text-stone-300 text-xs">✕</button>}
          </div>

          {/* Filter */}
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="bg-stone-900 border border-stone-800 text-stone-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 cursor-pointer">
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            {ROLES.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
          </select>

          {/* View toggle */}
          <div className="flex bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
            {[["grid","⊞"], ["list","☰"]].map(([v, icon]) => (
              <button key={v} onClick={() => setView(v)}
                className={`flex-1 px-4 py-2.5 text-sm font-semibold transition-colors ${view === v ? "bg-amber-500 text-white" : "text-stone-400 hover:text-stone-200"}`}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        {visible.length === 0 ? (
          <div className="text-center py-20 bg-stone-900 border border-stone-800 rounded-2xl">
            <p className="text-4xl mb-3">👤</p>
            <p className="text-stone-500 font-semibold">No users found</p>
            <p className="text-stone-600 text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visible.map(u => (
              <UserCard key={u.id} user={u} onEdit={setPanel} onDelete={setDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-800">
                  {["User","Role","Status","Bio","Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-stone-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(u => (
                  <tr key={u.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} id={u.id} size="sm" />
                        <div>
                          <p className="font-semibold text-stone-100">{u.name}</p>
                          <p className="text-xs text-stone-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><Badge cls={ROLE_COLORS[u.role] ?? ""}>{u.role}</Badge></td>
                    <td className="px-5 py-4"><Badge cls={STATUS_COLORS[u.status] ?? ""}>{u.status}</Badge></td>
                    <td className="px-5 py-4 max-w-[200px]">
                      {u.bio
                        ? <div className="text-xs text-stone-500 line-clamp-1 [&_*]:!text-stone-500 [&_strong]:!text-stone-400"
                            dangerouslySetInnerHTML={{ __html: u.bio }} />
                        : <span className="text-xs text-stone-700 italic">No bio</span>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setPanel(u)}
                          className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-500/40 flex items-center justify-center text-xs text-stone-400 hover:text-amber-400 transition-all">✏️</button>
                        <button onClick={() => setDelete(u)}
                          className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-red-900/30 border border-stone-700 hover:border-red-700/40 flex items-center justify-center text-xs text-stone-400 hover:text-red-400 transition-all">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-stone-800">
              <p className="text-xs text-stone-600">Showing {visible.length} of {users.length} users</p>
            </div>
          </div>
        )}
      </div>

      {/* Slide-in form */}
      {panel !== null && (
        <SlideForm user={panel === "add" ? null : panel} onClose={() => setPanel(null)} onSave={handleSave} />
      )}

      {/* Delete modal */}
      {deleting && (
        <DeleteModal user={deleting} onCancel={() => setDelete(null)} onConfirm={handleDelete} />
      )}
    </div>
  );
}