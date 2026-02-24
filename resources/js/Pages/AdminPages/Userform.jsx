import { useState, useMemo } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const ROLES = [
  { value: "super_admin",  label: "Super Admin",  icon: "👑", color: "amber"   },
  { value: "manager",      label: "Manager",      icon: "🏨", color: "violet"  },
  { value: "receptionist", label: "Receptionist", icon: "🛎", color: "sky"     },
  { value: "housekeeper",  label: "Housekeeper",  icon: "🧹", color: "emerald" },
  { value: "accountant",   label: "Accountant",   icon: "📊", color: "rose"    },
];

const PROPERTIES = [
  "All Properties", "Azure Cliff Villa", "Palm Shore Suites",
  "Coral Bay Retreat", "Indigo Garden Lodge", "Marina Grand Hotel",
];

const ROLE_COLORS = {
  amber:   { badge: "bg-amber-900/50 text-amber-300 border-amber-600/40",   dot: "bg-amber-400"   },
  violet:  { badge: "bg-violet-900/50 text-violet-300 border-violet-600/40", dot: "bg-violet-400"  },
  sky:     { badge: "bg-sky-900/50 text-sky-300 border-sky-600/40",          dot: "bg-sky-400"     },
  emerald: { badge: "bg-emerald-900/50 text-emerald-300 border-emerald-600/40", dot: "bg-emerald-400" },
  rose:    { badge: "bg-rose-900/50 text-rose-300 border-rose-600/40",       dot: "bg-rose-400"    },
};

const STATUS_STYLES = {
  active:    "bg-emerald-900/50 text-emerald-300 border-emerald-600/40",
  inactive:  "bg-stone-700/50 text-stone-400 border-stone-600/40",
  suspended: "bg-red-900/50 text-red-300 border-red-600/40",
};

const AVATAR_GRADIENTS = [
  "from-amber-500 to-orange-600",
  "from-violet-500 to-purple-700",
  "from-sky-500 to-blue-700",
  "from-emerald-500 to-teal-700",
  "from-rose-500 to-pink-700",
  "from-teal-500 to-cyan-700",
];

const SEED_USERS = [
  { id: 1, name: "Eleanor Voss",    email: "eleanor@hotel.com", phone: "+1 800 100 2000", role: "super_admin",  property: "All Properties",    status: "active",    joined: "Jan 2023" },
  { id: 2, name: "Marcus Chen",     email: "marcus@hotel.com",  phone: "+1 800 200 3000", role: "manager",      property: "Palm Shore Suites", status: "active",    joined: "Mar 2023" },
  { id: 3, name: "Isabelle Dubois", email: "isa@hotel.com",     phone: "+1 800 300 4000", role: "receptionist", property: "Coral Bay Retreat", status: "inactive",  joined: "Jun 2023" },
  { id: 4, name: "Rafael Torres",   email: "rafael@hotel.com",  phone: "+1 800 400 5000", role: "housekeeper",  property: "Azure Cliff Villa", status: "suspended", joined: "Sep 2023" },
  { id: 5, name: "Amara Osei",      email: "amara@hotel.com",   phone: "+1 800 500 6000", role: "accountant",   property: "Marina Grand Hotel",status: "active",    joined: "Dec 2023" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const getInitials = (name) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const getGradient = (id)   => AVATAR_GRADIENTS[(id - 1) % AVATAR_GRADIENTS.length];
const getRoleInfo = (v)    => ROLES.find(r => r.value === v) ?? ROLES[2];
const emptyForm   = ()     => ({ name: "", email: "", phone: "", role: "receptionist", property: "All Properties", status: "active", password: "", confirm: "" });

// ── Avatar ────────────────────────────────────────────────────────────────────
const Avatar = ({ name, id, size = "sm" }) => {
  const sz = size === "lg" ? "w-14 h-14 text-base" : size === "md" ? "w-9 h-9 text-xs" : "w-8 h-8 text-xs";
  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br ${getGradient(id)} flex items-center justify-center font-bold text-white flex-shrink-0 shadow-md`}>
      {getInitials(name || "?")}
    </div>
  );
};

// ── Badges ────────────────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const r = getRoleInfo(role);
  const c = ROLE_COLORS[r.color];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {r.label}
    </span>
  );
};

const StatusBadge = ({ status }) => (
  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[status] ?? STATUS_STYLES.inactive}`}>
    {status}
  </span>
);

// ── Form Field Components ─────────────────────────────────────────────────────
const Field = ({ label, required, error, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase tracking-widest">
      {label}
      {required && <span className="text-amber-400 text-sm leading-none">*</span>}
    </label>
    {children}
    {error && (
      <p className="flex items-center gap-1 text-xs text-red-400">
        <span>⚠</span> {error}
      </p>
    )}
  </div>
);

const TextInput = ({ value, onChange, placeholder, type = "text", error, icon }) => (
  <div className={`flex items-center bg-stone-800/80 border rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-1 focus-within:ring-amber-500/50 ${error ? "border-red-500/60" : "border-stone-700 focus-within:border-amber-500"}`}>
    {icon && <span className="pl-3 text-stone-500 select-none text-sm">{icon}</span>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-transparent px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none"
    />
  </div>
);

const SelectInput = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none bg-stone-800/80 border border-stone-700 text-stone-200 text-sm rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 cursor-pointer"
    >
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs">▾</span>
  </div>
);

// ── Delete Confirm ────────────────────────────────────────────────────────────
const DeleteConfirm = ({ user, onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-5">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-red-900/30 border border-red-700/40 flex items-center justify-center text-2xl">🗑️</div>
        <div>
          <p className="text-base font-bold text-stone-100">Remove User?</p>
          <p className="text-sm text-stone-400 mt-1">
            <span className="font-semibold text-stone-200">{user.name}</span> will lose all access immediately.
          </p>
        </div>
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
);

// ── User Form Panel ───────────────────────────────────────────────────────────
const UserFormPanel = ({ user, onClose, onSave }) => {
  const isEdit = Boolean(user?.id);
  const [form, setForm]     = useState(isEdit ? { ...user, password: "", confirm: "" } : emptyForm());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = key => val => { setForm(f => ({ ...f, [key]: val })); setErrors(e => ({ ...e, [key]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!isEdit && !form.password)        e.password = "Password is required";
    if (form.password && form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password && form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      onSave({
        ...form,
        id:     isEdit ? user.id : Date.now(),
        joined: isEdit ? user.joined : new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      });
      setLoading(false);
    }, 700);
  };

  const role = getRoleInfo(form.role);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-stone-950 border-l border-stone-800 z-40 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-base">
              {isEdit ? "✏️" : "➕"}
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-100">{isEdit ? "Edit User" : "New User"}</h2>
              <p className="text-[11px] text-stone-500 mt-0.5">{isEdit ? `Updating ${user.name.split(" ")[0]}'s profile` : "Fill in details to create account"}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-200 transition-colors text-sm">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-6">

            {/* Edit: show current user card */}
            {isEdit && (
              <div className="flex items-center gap-4 p-4 bg-stone-900 border border-stone-800 rounded-2xl">
                <Avatar name={user.name} id={user.id} size="lg" />
                <div className="min-w-0">
                  <p className="font-bold text-stone-100 text-sm truncate">{user.name}</p>
                  <p className="text-xs text-stone-500 truncate">{user.email}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <RoleBadge role={user.role} />
                    <StatusBadge status={user.status} />
                  </div>
                </div>
              </div>
            )}

            {/* Section: Personal */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-stone-800" />
                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Personal Info</span>
                <div className="h-px flex-1 bg-stone-800" />
              </div>
              <Field label="Full Name" required error={errors.name}>
                <TextInput value={form.name} onChange={set("name")} placeholder="Jane Smith" icon="👤" error={errors.name} />
              </Field>
              <Field label="Email Address" required error={errors.email}>
                <TextInput value={form.email} onChange={set("email")} placeholder="jane@hotel.com" type="email" icon="✉️" error={errors.email} />
              </Field>
              <Field label="Phone Number">
                <TextInput value={form.phone} onChange={set("phone")} placeholder="+1 800 000 0000" icon="📞" />
              </Field>
            </div>

            {/* Section: Role */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-stone-800" />
                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Role & Access</span>
                <div className="h-px flex-1 bg-stone-800" />
              </div>

              {/* Role cards */}
              <Field label="Role" required>
                <div className="grid grid-cols-1 gap-2 mt-0.5">
                  {ROLES.map(r => {
                    const c       = ROLE_COLORS[r.color];
                    const active  = form.role === r.value;
                    return (
                      <button key={r.value} onClick={() => set("role")(r.value)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all duration-150
                          ${active ? `${c.badge}` : "bg-stone-800/50 border-stone-700/50 hover:border-stone-600 hover:bg-stone-800"}`}>
                        <span className="text-base w-5 text-center">{r.icon}</span>
                        <span className={`text-sm font-semibold flex-1 ${active ? "" : "text-stone-400"}`}>{r.label}</span>
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${active ? `${c.dot} border-transparent` : "border-stone-600"}`}>
                          {active && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label="Assigned Property" required>
                <SelectInput value={form.property} onChange={set("property")} options={PROPERTIES} />
              </Field>

              <Field label="Account Status" required>
                <SelectInput value={form.status} onChange={set("status")} options={[
                  { value: "active",    label: "● Active"    },
                  { value: "inactive",  label: "○ Inactive"  },
                  { value: "suspended", label: "⊘ Suspended" },
                ]} />
              </Field>
            </div>

            {/* Section: Password */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-stone-800" />
                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                  {isEdit ? "Change Password" : "Set Password"}
                </span>
                <div className="h-px flex-1 bg-stone-800" />
              </div>
              {isEdit && <p className="text-xs text-stone-500 -mt-2">Leave blank to keep existing password</p>}

              <Field label="Password" required={!isEdit} error={errors.password}>
                <div className={`flex items-center bg-stone-800/80 border rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-1 focus-within:ring-amber-500/50 ${errors.password ? "border-red-500/60" : "border-stone-700 focus-within:border-amber-500"}`}>
                  <span className="pl-3 text-stone-500 select-none text-sm">🔒</span>
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={e => set("password")(e.target.value)}
                    placeholder={isEdit ? "Leave blank to keep current" : "Min. 8 characters"}
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:outline-none"
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="pr-3 text-stone-500 hover:text-stone-300 text-sm transition-colors">
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </Field>

              <Field label="Confirm Password" required={!isEdit} error={errors.confirm}>
                <TextInput
                  value={form.confirm} onChange={set("confirm")}
                  placeholder="Re-enter password" type={showPass ? "text" : "password"}
                  icon="🔑" error={errors.confirm}
                />
              </Field>

              {/* Password strength */}
              {form.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        form.password.length >= i * 3
                          ? i <= 1 ? "bg-red-500"
                          : i <= 2 ? "bg-amber-500"
                          : i <= 3 ? "bg-yellow-400"
                          : "bg-emerald-500"
                          : "bg-stone-800"
                      }`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-stone-500">
                    {form.password.length < 4 ? "Too weak" : form.password.length < 7 ? "Weak" : form.password.length < 10 ? "Fair" : "Strong"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-800 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-sm font-semibold rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow flex items-center justify-center gap-2">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
              : isEdit ? "Save Changes" : "Create User"}
          </button>
        </div>
      </div>
    </>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
export default function Userform() {
  const [users, setUsers]       = useState(SEED_USERS);
  const [panel, setPanel]       = useState(null); // null | "add" | user-object
  const [toDelete, setToDelete] = useState(null);
  const [search, setSearch]     = useState("");
  const [toast, setToast]       = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

const handleSave = (saved) => {
  setUsers(prev => {
    const exists = prev.find(u => u.id === saved.id);
    return exists ? prev.map(u => u.id === saved.id ? saved : u) : [...prev, saved];
  });
  setPanel(null);
  
  // Determine if this is an edit or create based on whether panel was a user object
  const isEdit = panel && typeof panel === "object";
  showToast(isEdit ? "User updated successfully" : "User created successfully");
};
  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setToDelete(null);
    showToast("User deleted", "error");
  };

  const filtered = useMemo(() =>
    users.filter(u => {
      const q = search.toLowerCase();
      return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }), [users, search]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-8" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-xl text-sm font-semibold transition-all
          ${toast.type === "error"
            ? "bg-red-900/90 border-red-700/60 text-red-200"
            : "bg-emerald-900/90 border-emerald-700/60 text-emerald-200"}`}>
          <span>{toast.type === "error" ? "🗑️" : "✓"}</span>
          {toast.msg}
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-100">Users</h1>
            <p className="text-sm text-stone-500 mt-0.5">
              {users.length} staff member{users.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button onClick={() => setPanel("add")}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-amber-900/30">
            <span className="text-lg leading-none">+</span> Add User
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 focus-within:border-amber-500 transition-colors">
          <span className="text-stone-500">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="flex-1 bg-transparent text-sm text-stone-200 placeholder-stone-600 focus:outline-none" />
          {search && <button onClick={() => setSearch("")} className="text-stone-500 hover:text-stone-300 text-xs">✕</button>}
        </div>

        {/* User List */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-stone-600">
              <p className="text-4xl mb-3">👤</p>
              <p className="text-sm font-semibold text-stone-500">No users found</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-800/60">
              {filtered.map(user => (
                <div key={user.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-stone-800/30 transition-colors group">

                  <Avatar name={user.name} id={user.id} size="md" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-stone-100 truncate">{user.name}</p>
                      <RoleBadge role={user.role} />
                      <StatusBadge status={user.status} />
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 truncate">{user.email}</p>
                    <p className="text-[10px] text-stone-600 mt-0.5">{user.property} · Joined {user.joined}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setPanel(user)}
                      className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-amber-500/20 border border-stone-700 hover:border-amber-500/40 flex items-center justify-center text-stone-400 hover:text-amber-400 transition-all text-xs"
                      title="Edit">
                      ✏️
                    </button>
                    <button onClick={() => setToDelete(user)}
                      className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-red-900/30 border border-stone-700 hover:border-red-700/40 flex items-center justify-center text-stone-400 hover:text-red-400 transition-all text-xs"
                      title="Delete">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-stone-700">
          Hover a row to edit or delete · Click + Add User to create
        </p>
      </div>

      {/* Form Panel */}
      {panel !== null && (
        <UserFormPanel
          user={panel === "add" ? null : panel}
          onClose={() => setPanel(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm */}
      {toDelete && (
        <DeleteConfirm
          user={toDelete}
          onCancel={() => setToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}