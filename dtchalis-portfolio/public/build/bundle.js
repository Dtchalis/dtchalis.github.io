
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.56.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\shared\Tabs.svelte generated by Svelte v3.56.0 */
    const file$9 = "src\\shared\\Tabs.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (11:8) {#each items as item}
    function create_each_block$1(ctx) {
    	let li;
    	let div;
    	let t0_value = /*item*/ ctx[4] + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[3](/*item*/ ctx[4]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "svelte-1gtfy4k");
    			toggle_class(div, "active", /*item*/ ctx[4] === /*activeItem*/ ctx[1]);
    			toggle_class(div, "inactive", /*item*/ ctx[4] != /*activeItem*/ ctx[1]);
    			add_location(div, file$9, 14, 12, 420);
    			attr_dev(li, "class", "svelte-1gtfy4k");
    			add_location(li, file$9, 13, 8, 357);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);
    			append_dev(div, t0);
    			insert_dev(target, t1, anchor);

    			if (!mounted) {
    				dispose = listen_dev(li, "click", click_handler, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*items*/ 1 && t0_value !== (t0_value = /*item*/ ctx[4] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*items, activeItem*/ 3) {
    				toggle_class(div, "active", /*item*/ ctx[4] === /*activeItem*/ ctx[1]);
    			}

    			if (dirty & /*items, activeItem*/ 3) {
    				toggle_class(div, "inactive", /*item*/ ctx[4] != /*activeItem*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (detaching) detach_dev(t1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(11:8) {#each items as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div;
    	let ul;
    	let each_value = /*items*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "svelte-1gtfy4k");
    			add_location(ul, file$9, 9, 4, 207);
    			attr_dev(div, "class", "tabs svelte-1gtfy4k");
    			add_location(div, file$9, 8, 0, 183);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(ul, null);
    				}
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*dispatch, items, activeItem*/ 7) {
    				each_value = /*items*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tabs', slots, []);
    	const dispatch = createEventDispatcher();
    	let { items = [''] } = $$props;
    	let { activeItem = '' } = $$props;
    	const writable_props = ['items', 'activeItem'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tabs> was created with unknown prop '${key}'`);
    	});

    	const click_handler = item => dispatch('tabChange', item);

    	$$self.$$set = $$props => {
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    		if ('activeItem' in $$props) $$invalidate(1, activeItem = $$props.activeItem);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		items,
    		activeItem
    	});

    	$$self.$inject_state = $$props => {
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    		if ('activeItem' in $$props) $$invalidate(1, activeItem = $$props.activeItem);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [items, activeItem, dispatch, click_handler];
    }

    class Tabs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { items: 0, activeItem: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tabs",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get items() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeItem() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeItem(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Footer.svelte generated by Svelte v3.56.0 */
    const file$8 = "src\\components\\Footer.svelte";

    // (14:4) {#if activeItem != 'GAMES'}
    function create_if_block$3(ctx) {
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "img/Assets/Dtchalis_Logo_Text_2.gif")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1keo9qu");
    			add_location(img, file$8, 14, 8, 429);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);

    			if (!mounted) {
    				dispose = listen_dev(img, "click", /*click_handler*/ ctx[3], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(14:4) {#if activeItem != 'GAMES'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let footer;
    	let t;
    	let tabs;
    	let current;
    	let if_block = /*activeItem*/ ctx[1] != 'GAMES' && create_if_block$3(ctx);

    	tabs = new Tabs({
    			props: {
    				activeItem: /*activeItem*/ ctx[1],
    				items: /*items*/ ctx[0]
    			},
    			$$inline: true
    		});

    	tabs.$on("tabChange", /*tabChange_handler*/ ctx[4]);

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			if (if_block) if_block.c();
    			t = space();
    			create_component(tabs.$$.fragment);
    			attr_dev(footer, "class", "svelte-1keo9qu");
    			add_location(footer, file$8, 10, 0, 232);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			if (if_block) if_block.m(footer, null);
    			append_dev(footer, t);
    			mount_component(tabs, footer, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*activeItem*/ ctx[1] != 'GAMES') {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(footer, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const tabs_changes = {};
    			if (dirty & /*activeItem*/ 2) tabs_changes.activeItem = /*activeItem*/ ctx[1];
    			if (dirty & /*items*/ 1) tabs_changes.items = /*items*/ ctx[0];
    			tabs.$set(tabs_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabs.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabs.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			if (if_block) if_block.d();
    			destroy_component(tabs);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	let dispatch = createEventDispatcher();
    	let { items = [''] } = $$props;
    	let { activeItem = '' } = $$props;
    	const writable_props = ['items', 'activeItem'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('resetActiveTab', 'HOME');

    	function tabChange_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    		if ('activeItem' in $$props) $$invalidate(1, activeItem = $$props.activeItem);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		Tabs,
    		dispatch,
    		items,
    		activeItem
    	});

    	$$self.$inject_state = $$props => {
    		if ('dispatch' in $$props) $$invalidate(2, dispatch = $$props.dispatch);
    		if ('items' in $$props) $$invalidate(0, items = $$props.items);
    		if ('activeItem' in $$props) $$invalidate(1, activeItem = $$props.activeItem);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [items, activeItem, dispatch, click_handler, tabChange_handler];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { items: 0, activeItem: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get items() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get activeItem() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set activeItem(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const GamesStore = writable([
        { id: 0, title: 'ReFractal', card: 'img/Assets/gifs/Refractal_card.gif', splash: 'img/Assets/gifs/Refractal_splash.gif', accent: '#1A121F', link: 'google.com'},
        { id: 1, title: 'Burst - Component Creator', card: 'img/Assets/gifs/BurstCC_card.gif', splash: 'img/Assets/gifs/BurstCC_splash.gif', accent: '#EEEEEE', link: 'google.com'},
        // { id: 2, title: 'Tower Jump', card: 'img/Assets/gifs/TowerJump_card.png', splash: 'img/Assets/gifs/TowerJump_splash_2.gif', accent: '', link: 'google.com' },
        // { id: 3, title: 'Burst TCG', card: '', splash: '', accent: ''},
        // { id: 4, title: 'Super Rhythm Fighter', card: '', splash: '', accent: '' },
        // { id: 5, title: 'Die Man Dungeon', card: '', splash: '', accent: '' },
        // { id: 6, title: 'DCM', card: '', splash: '', accent: '', accent: '' },
        // { id: 7, title: 'Beyond the Veil', card: '', splash: '', accent: '' },
        // { id: 8, title: 'Lament In Paradise', card: '', splash: '', accent: '' },
        // { id: 9, title: 'Requiem of the End', card: '', splash: '', accent: '' },
        // { id: 10, title: 'SankVerse', card: '', splash: '', accent: '' },
    ]);

    /* src\components\SplashArt.svelte generated by Svelte v3.56.0 */
    const file$7 = "src\\components\\SplashArt.svelte";

    // (14:57) 
    function create_if_block_1$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*$GamesStore*/ ctx[0][1].splash)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-57jrru");
    			add_location(img, file$7, 14, 8, 463);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$GamesStore*/ 1 && !src_url_equal(img.src, img_src_value = /*$GamesStore*/ ctx[0][1].splash)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(14:57) ",
    		ctx
    	});

    	return block;
    }

    // (12:4) {#if game.title === 'ReFractal'}
    function create_if_block$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*$GamesStore*/ ctx[0][0].splash)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-57jrru");
    			add_location(img, file$7, 12, 8, 352);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$GamesStore*/ 1 && !src_url_equal(img.src, img_src_value = /*$GamesStore*/ ctx[0][0].splash)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(12:4) {#if game.title === 'ReFractal'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (/*game*/ ctx[1].title === 'ReFractal') return create_if_block$2;
    		if (/*game*/ ctx[1].title === 'Burst - Component Creator') return create_if_block_1$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "coverImage svelte-57jrru");
    			set_style(div, "background-color", "black");
    			add_location(div, file$7, 8, 0, 147);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let game;
    	let $GamesStore;
    	validate_store(GamesStore, 'GamesStore');
    	component_subscribe($$self, GamesStore, $$value => $$invalidate(0, $GamesStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SplashArt', slots, []);
    	let { gameID = 0 } = $$props;
    	const writable_props = ['gameID'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SplashArt> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('gameID' in $$props) $$invalidate(2, gameID = $$props.gameID);
    	};

    	$$self.$capture_state = () => ({ GamesStore, gameID, game, $GamesStore });

    	$$self.$inject_state = $$props => {
    		if ('gameID' in $$props) $$invalidate(2, gameID = $$props.gameID);
    		if ('game' in $$props) $$invalidate(1, game = $$props.game);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$GamesStore, gameID*/ 5) {
    			$$invalidate(1, game = $GamesStore[gameID]);
    		}
    	};

    	return [$GamesStore, game, gameID];
    }

    class SplashArt extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { gameID: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SplashArt",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get gameID() {
    		throw new Error("<SplashArt>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gameID(value) {
    		throw new Error("<SplashArt>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\shared\ContentCard.svelte generated by Svelte v3.56.0 */
    const file$6 = "src\\shared\\ContentCard.svelte";

    // (9:6)       
    function fallback_block(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "card svelte-1hgiflu");
    			set_style(div, "background-image", "url(" + /*game*/ ctx[0].card + ")");
    			add_location(div, file$6, 9, 4, 251);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"mouseover",
    					function () {
    						if (is_function(/*dispatch*/ ctx[1]('handleMouseOver', /*game*/ ctx[0].id))) /*dispatch*/ ctx[1]('handleMouseOver', /*game*/ ctx[0].id).apply(this, arguments);
    					},
    					false,
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*game*/ 1) {
    				set_style(div, "background-image", "url(" + /*game*/ ctx[0].card + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(9:6)       ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*game*/ 1)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContentCard', slots, ['default']);
    	let dispatch = createEventDispatcher();
    	let { game = { title: '', card: '', splash: '' } } = $$props;
    	const writable_props = ['game'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContentCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('game' in $$props) $$invalidate(0, game = $$props.game);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ createEventDispatcher, dispatch, game });

    	$$self.$inject_state = $$props => {
    		if ('dispatch' in $$props) $$invalidate(1, dispatch = $$props.dispatch);
    		if ('game' in $$props) $$invalidate(0, game = $$props.game);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [game, dispatch, $$scope, slots];
    }

    class ContentCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { game: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContentCard",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get game() {
    		throw new Error("<ContentCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set game(value) {
    		throw new Error("<ContentCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\shared\Carousel.svelte generated by Svelte v3.56.0 */

    const { console: console_1$2 } = globals;
    const file$5 = "src\\shared\\Carousel.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (25:16) {#each $GamesStore as game, i}
    function create_each_block(ctx) {
    	let contentcard;
    	let current;

    	contentcard = new ContentCard({
    			props: { game: /*game*/ ctx[3] },
    			$$inline: true
    		});

    	contentcard.$on("handleMouseOver", /*handleMouseOver_handler*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(contentcard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contentcard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contentcard_changes = {};
    			if (dirty & /*$GamesStore*/ 1) contentcard_changes.game = /*game*/ ctx[3];
    			contentcard.$set(contentcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contentcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contentcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contentcard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(25:16) {#each $GamesStore as game, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*$GamesStore*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			set_style(div0, "transform", "translateY(" + /*currentIndex*/ ctx[1] * 150 + "px)");
    			add_location(div0, file$5, 23, 8, 638);
    			attr_dev(div1, "class", "child svelte-1owaiu4");
    			add_location(div1, file$5, 22, 4, 609);
    			attr_dev(div2, "class", "parent svelte-1owaiu4");
    			add_location(div2, file$5, 21, 0, 583);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "wheel", handleWheel, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$GamesStore*/ 1) {
    				each_value = /*$GamesStore*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleWheel(event) {
    	
    } // if (event.deltaY < 0 && currentIndex < 0)
    //     currentIndex++;

    function instance$7($$self, $$props, $$invalidate) {
    	let $GamesStore;
    	validate_store(GamesStore, 'GamesStore');
    	component_subscribe($$self, GamesStore, $$value => $$invalidate(0, $GamesStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Carousel', slots, []);

    	onMount(() => {
    		console.log($GamesStore);
    	});

    	let currentIndex = 0;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Carousel> was created with unknown prop '${key}'`);
    	});

    	function handleMouseOver_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$capture_state = () => ({
    		ContentCard,
    		GamesStore,
    		onMount,
    		currentIndex,
    		handleWheel,
    		$GamesStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('currentIndex' in $$props) $$invalidate(1, currentIndex = $$props.currentIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$GamesStore, currentIndex, handleMouseOver_handler];
    }

    class Carousel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Carousel",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\Games.svelte generated by Svelte v3.56.0 */

    function create_fragment$6(ctx) {
    	let carousel;
    	let current;
    	carousel = new Carousel({ $$inline: true });
    	carousel.$on("handleMouseOver", /*handleMouseOver_handler*/ ctx[0]);

    	const block = {
    		c: function create() {
    			create_component(carousel.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(carousel, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(carousel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(carousel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(carousel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Games', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Games> was created with unknown prop '${key}'`);
    	});

    	function handleMouseOver_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$capture_state = () => ({ Carousel });
    	return [handleMouseOver_handler];
    }

    class Games extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Games",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\shared\MusicPlayer.svelte generated by Svelte v3.56.0 */

    const file$4 = "src\\shared\\MusicPlayer.svelte";

    // (22:6) {:else}
    function create_else_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Play");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(22:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:6) {#if isPlaying}
    function create_if_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Pause");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(20:6) {#if isPlaying}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div3;
    	let button;
    	let t0;
    	let div1;
    	let div0;
    	let div0_style_value;
    	let t1;
    	let div2;
    	let t2_value = /*playbackTime*/ ctx[0].toFixed(2) + "";
    	let t2;
    	let t3;
    	let t4_value = /*duration*/ ctx[2].toFixed(2) + "";
    	let t4;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*isPlaying*/ ctx[1]) return create_if_block$1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			button = element("button");
    			if_block.c();
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = text(t2_value);
    			t3 = text(" / ");
    			t4 = text(t4_value);
    			attr_dev(button, "class", "svelte-1f3oh4n");
    			add_location(button, file$4, 18, 4, 468);
    			attr_dev(div0, "class", "progress svelte-1f3oh4n");
    			attr_dev(div0, "style", div0_style_value = `width: ${/*playbackTime*/ ctx[0] / /*duration*/ ctx[2] * 100}%`);
    			add_location(div0, file$4, 28, 6, 725);
    			attr_dev(div1, "class", "scrubbing-bar svelte-1f3oh4n");
    			add_location(div1, file$4, 27, 4, 671);
    			attr_dev(div2, "class", "playback-time svelte-1f3oh4n");
    			add_location(div2, file$4, 31, 4, 828);
    			attr_dev(div3, "class", "music-player svelte-1f3oh4n");
    			add_location(div3, file$4, 17, 2, 436);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, button);
    			if_block.m(button, null);
    			append_dev(div3, t0);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, t2);
    			append_dev(div2, t3);
    			append_dev(div2, t4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*togglePlayback*/ ctx[3], false, false, false, false),
    					listen_dev(div1, "click", /*onScrub*/ ctx[4], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(button, null);
    				}
    			}

    			if (dirty & /*playbackTime, duration*/ 5 && div0_style_value !== (div0_style_value = `width: ${/*playbackTime*/ ctx[0] / /*duration*/ ctx[2] * 100}%`)) {
    				attr_dev(div0, "style", div0_style_value);
    			}

    			if (dirty & /*playbackTime*/ 1 && t2_value !== (t2_value = /*playbackTime*/ ctx[0].toFixed(2) + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*duration*/ 4 && t4_value !== (t4_value = /*duration*/ ctx[2].toFixed(2) + "")) set_data_dev(t4, t4_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MusicPlayer', slots, []);
    	let { playbackTime = 0 } = $$props;
    	let { duration = 100 } = $$props;
    	let { isPlaying = false } = $$props;

    	function togglePlayback() {
    		$$invalidate(1, isPlaying = !isPlaying);
    	}

    	function onScrub(event) {
    		const rect = event.target.getBoundingClientRect();
    		const x = event.clientX - rect.left;
    		const percentage = x / rect.width;
    		$$invalidate(0, playbackTime = percentage * duration);
    	}

    	const writable_props = ['playbackTime', 'duration', 'isPlaying'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MusicPlayer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('playbackTime' in $$props) $$invalidate(0, playbackTime = $$props.playbackTime);
    		if ('duration' in $$props) $$invalidate(2, duration = $$props.duration);
    		if ('isPlaying' in $$props) $$invalidate(1, isPlaying = $$props.isPlaying);
    	};

    	$$self.$capture_state = () => ({
    		playbackTime,
    		duration,
    		isPlaying,
    		togglePlayback,
    		onScrub
    	});

    	$$self.$inject_state = $$props => {
    		if ('playbackTime' in $$props) $$invalidate(0, playbackTime = $$props.playbackTime);
    		if ('duration' in $$props) $$invalidate(2, duration = $$props.duration);
    		if ('isPlaying' in $$props) $$invalidate(1, isPlaying = $$props.isPlaying);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [playbackTime, isPlaying, duration, togglePlayback, onScrub];
    }

    class MusicPlayer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			playbackTime: 0,
    			duration: 2,
    			isPlaying: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MusicPlayer",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get playbackTime() {
    		throw new Error("<MusicPlayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackTime(value) {
    		throw new Error("<MusicPlayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get duration() {
    		throw new Error("<MusicPlayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<MusicPlayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isPlaying() {
    		throw new Error("<MusicPlayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isPlaying(value) {
    		throw new Error("<MusicPlayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Music.svelte generated by Svelte v3.56.0 */
    const file$3 = "src\\components\\Music.svelte";

    function create_fragment$4(ctx) {
    	let div2;
    	let div1;
    	let h1;
    	let t1;
    	let div0;
    	let button0;
    	let t3;
    	let button1;
    	let t5;
    	let button2;
    	let t7;
    	let musicplayer;
    	let current;

    	musicplayer = new MusicPlayer({
    			props: {
    				playbackTime: /*playbackTime*/ ctx[0],
    				duration: /*duration*/ ctx[1],
    				isPlaying: /*isPlaying*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Latest n' Greatest";
    			t1 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Orchestral";
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "VGM";
    			t5 = space();
    			button2 = element("button");
    			button2.textContent = "Hip-Hop/RnB";
    			t7 = space();
    			create_component(musicplayer.$$.fragment);
    			attr_dev(h1, "class", "svelte-1xj2dfr");
    			add_location(h1, file$3, 10, 6, 219);
    			attr_dev(button0, "class", "svelte-1xj2dfr");
    			add_location(button0, file$3, 12, 8, 294);
    			attr_dev(button1, "class", "svelte-1xj2dfr");
    			add_location(button1, file$3, 13, 8, 331);
    			attr_dev(button2, "class", "svelte-1xj2dfr");
    			add_location(button2, file$3, 14, 8, 361);
    			attr_dev(div0, "class", "button-container svelte-1xj2dfr");
    			add_location(div0, file$3, 11, 6, 254);
    			attr_dev(div1, "class", "child svelte-1xj2dfr");
    			add_location(div1, file$3, 9, 4, 192);
    			attr_dev(div2, "class", "parent svelte-1xj2dfr");
    			add_location(div2, file$3, 8, 0, 166);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t3);
    			append_dev(div0, button1);
    			append_dev(div0, t5);
    			append_dev(div0, button2);
    			append_dev(div1, t7);
    			mount_component(musicplayer, div1, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(musicplayer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(musicplayer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(musicplayer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Music', slots, []);
    	let playbackTime = 0;
    	let duration = 100;
    	let isPlaying = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Music> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		MusicPlayer,
    		playbackTime,
    		duration,
    		isPlaying
    	});

    	$$self.$inject_state = $$props => {
    		if ('playbackTime' in $$props) $$invalidate(0, playbackTime = $$props.playbackTime);
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('isPlaying' in $$props) $$invalidate(2, isPlaying = $$props.isPlaying);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [playbackTime, duration, isPlaying];
    }

    class Music extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Music",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\Graphics.svelte generated by Svelte v3.56.0 */

    function create_fragment$3(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Graphics', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Graphics> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Graphics extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Graphics",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Info.svelte generated by Svelte v3.56.0 */
    const file$2 = "src\\components\\Info.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let p0;
    	let t1;
    	let p1;
    	let t2;
    	let a0;
    	let t4;
    	let a1;
    	let t6;
    	let t7;
    	let p2;
    	let t8;
    	let a2;
    	let t10;
    	let a3;
    	let t12;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "Driven by a love for curating euphoric digital experiences, game developer \r\n            and audio composer 'Dtchalis' strives to innovate within the \r\n            realms of sound and gameplay.";
    			t1 = space();
    			p1 = element("p");
    			t2 = text("With a diverse background in ");
    			a0 = element("a");
    			a0.textContent = "film scoring";
    			t4 = text(", \r\n            \r\n            \r\n            ");
    			a1 = element("a");
    			a1.textContent = "graphic design";
    			t6 = text(" and \r\n            software development, his creative vision blends traditional and modern elements into an eclectic\r\n            collage of analog and digital mediums.");
    			t7 = space();
    			p2 = element("p");
    			t8 = text("At present, Dtchalis is fully dedicated to his ");
    			a2 = element("a");
    			a2.textContent = "upcoming indie games";
    			t10 = text(" and \r\n            his highly anticipated debut EP. He strongly welcomes collaboration and \r\n            can be contacted at \r\n            \r\n            \r\n            ");
    			a3 = element("a");
    			a3.textContent = "theofficialdtchalis@gmail.com";
    			t12 = text(".");
    			attr_dev(p0, "class", "svelte-4s05zo");
    			add_location(p0, file$2, 8, 8, 178);
    			attr_dev(a0, "class", "svelte-4s05zo");
    			add_location(a0, file$2, 17, 41, 597);
    			attr_dev(a1, "class", "svelte-4s05zo");
    			add_location(a1, file$2, 20, 12, 813);
    			attr_dev(p1, "class", "svelte-4s05zo");
    			add_location(p1, file$2, 14, 8, 422);
    			attr_dev(a2, "class", "svelte-4s05zo");
    			add_location(a2, file$2, 28, 59, 1284);
    			attr_dev(a3, "class", "svelte-4s05zo");
    			add_location(a3, file$2, 33, 12, 1631);
    			attr_dev(p2, "class", "svelte-4s05zo");
    			add_location(p2, file$2, 25, 8, 1091);
    			attr_dev(div0, "class", "child svelte-4s05zo");
    			add_location(div0, file$2, 7, 4, 149);
    			attr_dev(div1, "class", "parent svelte-4s05zo");
    			add_location(div1, file$2, 6, 0, 123);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t1);
    			append_dev(div0, p1);
    			append_dev(p1, t2);
    			append_dev(p1, a0);
    			append_dev(p1, t4);
    			append_dev(p1, a1);
    			append_dev(p1, t6);
    			append_dev(div0, t7);
    			append_dev(div0, p2);
    			append_dev(p2, t8);
    			append_dev(p2, a2);
    			append_dev(p2, t10);
    			append_dev(p2, a3);
    			append_dev(p2, t12);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", /*click_handler*/ ctx[1], false, false, false, false),
    					listen_dev(a1, "click", /*click_handler_1*/ ctx[2], false, false, false, false),
    					listen_dev(a2, "click", /*click_handler_2*/ ctx[3], false, false, false, false),
    					listen_dev(a3, "click", /*click_handler_3*/ ctx[4], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Info', slots, []);
    	let dispatch = createEventDispatcher();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Info> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('onLinkClicked', 'MUSIC');
    	const click_handler_1 = () => dispatch('onLinkClicked', 'GRAPHICS');
    	const click_handler_2 = () => dispatch('onLinkClicked', 'GAMES');
    	const click_handler_3 = () => dispatch('onLinkClicked', 'CONTACT');
    	$$self.$capture_state = () => ({ createEventDispatcher, dispatch });

    	$$self.$inject_state = $$props => {
    		if ('dispatch' in $$props) $$invalidate(0, dispatch = $$props.dispatch);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [dispatch, click_handler, click_handler_1, click_handler_2, click_handler_3];
    }

    class Info extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Info",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\Contact.svelte generated by Svelte v3.56.0 */

    const { console: console_1$1 } = globals;
    const file$1 = "src\\components\\Contact.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let form;
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let label0;
    	let t5;
    	let input0;
    	let t6;
    	let label1;
    	let t8;
    	let input1;
    	let t9;
    	let textarea;
    	let t10;
    	let label2;
    	let t11;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			form = element("form");
    			h1 = element("h1");
    			h1.textContent = "Let's Talk";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Start a dialogue or sign up for our mailing list below.";
    			t3 = space();
    			label0 = element("label");
    			label0.textContent = "Name";
    			t5 = space();
    			input0 = element("input");
    			t6 = space();
    			label1 = element("label");
    			label1.textContent = "E-Mail";
    			t8 = space();
    			input1 = element("input");
    			t9 = space();
    			textarea = element("textarea");
    			t10 = space();
    			label2 = element("label");
    			t11 = space();
    			button = element("button");
    			button.textContent = "Submit";
    			attr_dev(h1, "class", "svelte-8dwoh8");
    			add_location(h1, file$1, 47, 12, 1308);
    			attr_dev(h2, "class", "svelte-8dwoh8");
    			add_location(h2, file$1, 49, 12, 1355);
    			attr_dev(label0, "for", "name");
    			add_location(label0, file$1, 51, 12, 1447);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "name");
    			attr_dev(input0, "class", "svelte-8dwoh8");
    			add_location(input0, file$1, 52, 12, 1491);
    			attr_dev(label1, "for", "email");
    			add_location(label1, file$1, 54, 12, 1573);
    			attr_dev(input1, "type", "email");
    			attr_dev(input1, "id", "email");
    			attr_dev(input1, "class", "svelte-8dwoh8");
    			add_location(input1, file$1, 55, 12, 1620);
    			attr_dev(textarea, "class", "svelte-8dwoh8");
    			add_location(textarea, file$1, 58, 12, 1775);
    			attr_dev(label2, "for", "");
    			add_location(label2, file$1, 59, 12, 1838);
    			attr_dev(button, "class", "svelte-8dwoh8");
    			add_location(button, file$1, 61, 12, 1888);
    			add_location(form, file$1, 46, 8, 1247);
    			attr_dev(div0, "class", "child svelte-8dwoh8");
    			add_location(div0, file$1, 45, 4, 1218);
    			attr_dev(div1, "class", "parent svelte-8dwoh8");
    			add_location(div1, file$1, 44, 0, 1192);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, form);
    			append_dev(form, h1);
    			append_dev(form, t1);
    			append_dev(form, h2);
    			append_dev(form, t3);
    			append_dev(form, label0);
    			append_dev(form, t5);
    			append_dev(form, input0);
    			set_input_value(input0, /*fields*/ ctx[0].name);
    			append_dev(form, t6);
    			append_dev(form, label1);
    			append_dev(form, t8);
    			append_dev(form, input1);
    			set_input_value(input1, /*fields*/ ctx[0].email);
    			append_dev(form, t9);
    			append_dev(form, textarea);
    			set_input_value(textarea, /*fields*/ ctx[0].message);
    			append_dev(form, t10);
    			append_dev(form, label2);
    			append_dev(form, t11);
    			append_dev(form, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[2]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[3]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[4]),
    					listen_dev(button, "click", /*submitHandler*/ ctx[1], false, false, false, false),
    					listen_dev(form, "submit", prevent_default(/*submitHandler*/ ctx[1]), false, true, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*fields*/ 1 && input0.value !== /*fields*/ ctx[0].name) {
    				set_input_value(input0, /*fields*/ ctx[0].name);
    			}

    			if (dirty & /*fields*/ 1 && input1.value !== /*fields*/ ctx[0].email) {
    				set_input_value(input1, /*fields*/ ctx[0].email);
    			}

    			if (dirty & /*fields*/ 1) {
    				set_input_value(textarea, /*fields*/ ctx[0].message);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	let dispatch = createEventDispatcher();
    	let fields = { name: '', email: '', message: '' };
    	let errors = { name: '', email: '' };
    	let valid = false;
    	let defaultMessage = 'Drop us a message here...';

    	const submitHandler = e => {
    		valid = true;

    		// validate name
    		if (fields.name.trim().length < 1) {
    			valid = false;
    			errors.name = 'Name must be at least 1 character long';
    		} else {
    			errors.name = '';
    		}

    		// validate email
    		if (fields.email.trim().length < 1) {
    			valid = false;
    			errors.email = "E-mail can't be empty";
    		} else if (!fields.email.includes('@')) {
    			valid = false;
    			errors.email = "E-mail must include an '@' symbol";
    		} else {
    			errors.email = '';
    		}

    		if (valid) {
    			console.log(fields);
    			dispatch('submitContact', fields);
    		}
    	};

    	onMount(() => {
    		$$invalidate(0, fields.message = defaultMessage, fields);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		fields.name = this.value;
    		$$invalidate(0, fields);
    	}

    	function input1_input_handler() {
    		fields.email = this.value;
    		$$invalidate(0, fields);
    	}

    	function textarea_input_handler() {
    		fields.message = this.value;
    		$$invalidate(0, fields);
    	}

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		onMount,
    		dispatch,
    		fields,
    		errors,
    		valid,
    		defaultMessage,
    		submitHandler
    	});

    	$$self.$inject_state = $$props => {
    		if ('dispatch' in $$props) dispatch = $$props.dispatch;
    		if ('fields' in $$props) $$invalidate(0, fields = $$props.fields);
    		if ('errors' in $$props) errors = $$props.errors;
    		if ('valid' in $$props) valid = $$props.valid;
    		if ('defaultMessage' in $$props) defaultMessage = $$props.defaultMessage;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		fields,
    		submitHandler,
    		input0_input_handler,
    		input1_input_handler,
    		textarea_input_handler
    	];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.56.0 */

    const { console: console_1 } = globals;
    const file = "src\\App.svelte";

    // (42:0) {#if activeItem === 'GAMES'}
    function create_if_block_6(ctx) {
    	let splashart;
    	let current;

    	splashart = new SplashArt({
    			props: { gameID: /*gameID*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(splashart.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(splashart, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const splashart_changes = {};
    			if (dirty & /*gameID*/ 2) splashart_changes.gameID = /*gameID*/ ctx[1];
    			splashart.$set(splashart_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(splashart.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(splashart.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(splashart, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(42:0) {#if activeItem === 'GAMES'}",
    		ctx
    	});

    	return block;
    }

    // (47:0) {#if activeItem != 'HOME'}
    function create_if_block_5(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "panelbg svelte-3ax6v5");
    			add_location(div, file, 47, 1, 1304);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(47:0) {#if activeItem != 'HOME'}",
    		ctx
    	});

    	return block;
    }

    // (61:35) 
    function create_if_block_4(ctx) {
    	let contact;
    	let current;
    	contact = new Contact({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(contact.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contact, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contact, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(61:35) ",
    		ctx
    	});

    	return block;
    }

    // (59:32) 
    function create_if_block_3(ctx) {
    	let info;
    	let current;
    	info = new Info({ $$inline: true });
    	info.$on("onLinkClicked", /*handleLinkClicked*/ ctx[5]);

    	const block = {
    		c: function create() {
    			create_component(info.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(info, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(info.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(info, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(59:32) ",
    		ctx
    	});

    	return block;
    }

    // (57:36) 
    function create_if_block_2(ctx) {
    	let graphics;
    	let current;
    	graphics = new Graphics({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(graphics.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(graphics, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(graphics.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(graphics.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(graphics, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(57:36) ",
    		ctx
    	});

    	return block;
    }

    // (55:33) 
    function create_if_block_1(ctx) {
    	let music;
    	let current;
    	music = new Music({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(music.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(music, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(music.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(music.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(music, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(55:33) ",
    		ctx
    	});

    	return block;
    }

    // (53:0) {#if activeItem === 'GAMES'}
    function create_if_block(ctx) {
    	let games;
    	let current;
    	games = new Games({ $$inline: true });
    	games.$on("handleMouseOver", /*handleMouseOver*/ ctx[6]);

    	const block = {
    		c: function create() {
    			create_component(games.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(games, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(games.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(games.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(games, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(53:0) {#if activeItem === 'GAMES'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let t0;
    	let footer;
    	let t1;
    	let t2;
    	let current_block_type_index;
    	let if_block2;
    	let if_block2_anchor;
    	let current;
    	let if_block0 = /*activeItem*/ ctx[0] === 'GAMES' && create_if_block_6(ctx);

    	footer = new Footer({
    			props: {
    				activeItem: /*activeItem*/ ctx[0],
    				items: /*items*/ ctx[2]
    			},
    			$$inline: true
    		});

    	footer.$on("tabChange", /*handleTabChange*/ ctx[3]);
    	footer.$on("resetActiveTab", /*resetActiveTab*/ ctx[4]);
    	let if_block1 = /*activeItem*/ ctx[0] != 'HOME' && create_if_block_5(ctx);

    	const if_block_creators = [
    		create_if_block,
    		create_if_block_1,
    		create_if_block_2,
    		create_if_block_3,
    		create_if_block_4
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*activeItem*/ ctx[0] === 'GAMES') return 0;
    		if (/*activeItem*/ ctx[0] === 'MUSIC') return 1;
    		if (/*activeItem*/ ctx[0] === 'GRAPHICS') return 2;
    		if (/*activeItem*/ ctx[0] === 'INFO') return 3;
    		if (/*activeItem*/ ctx[0] === 'CONTACT') return 4;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			create_component(footer.$$.fragment);
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(footer, target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t2, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*activeItem*/ ctx[0] === 'GAMES') {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*activeItem*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_6(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const footer_changes = {};
    			if (dirty & /*activeItem*/ 1) footer_changes.activeItem = /*activeItem*/ ctx[0];
    			footer.$set(footer_changes);

    			if (/*activeItem*/ ctx[0] != 'HOME') {
    				if (if_block1) ; else {
    					if_block1 = create_if_block_5(ctx);
    					if_block1.c();
    					if_block1.m(t2.parentNode, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block2) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block2 = if_blocks[current_block_type_index];

    					if (!if_block2) {
    						if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block2.c();
    					} else {
    						if_block2.p(ctx, dirty);
    					}

    					transition_in(if_block2, 1);
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				} else {
    					if_block2 = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(footer.$$.fragment, local);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(footer.$$.fragment, local);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(footer, detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t2);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let items = ['HOME', 'GAMES', 'MUSIC', 'INFO', 'CONTACT'];

    	// let items = ['HOME', 'GAMES', 'MUSIC', 'GRAPHICS', 'INFO', 'CONTACT'];
    	let activeItem = 'HOME';

    	let gameID = 0;

    	const handleTabChange = e => {
    		$$invalidate(0, activeItem = e.detail);
    	};

    	const resetActiveTab = () => {
    		$$invalidate(0, activeItem = 'HOME');
    	};

    	const handleLinkClicked = e => {
    		$$invalidate(0, activeItem = e.detail);
    		console.log(activeItem + ' page should be shown');
    	};

    	const handleMouseOver = e => {
    		$$invalidate(1, gameID = e.detail);
    	};

    	// var gameInstance = UnityLoader.instantiate("gameContainer", "Build/WebGL.json", {onProgress: UnityProgress});
    	onMount(() => {
    		$$invalidate(0, activeItem = 'HOME');
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		Footer,
    		SplashArt,
    		Games,
    		Music,
    		Graphics,
    		Info,
    		Contact,
    		items,
    		activeItem,
    		gameID,
    		handleTabChange,
    		resetActiveTab,
    		handleLinkClicked,
    		handleMouseOver
    	});

    	$$self.$inject_state = $$props => {
    		if ('items' in $$props) $$invalidate(2, items = $$props.items);
    		if ('activeItem' in $$props) $$invalidate(0, activeItem = $$props.activeItem);
    		if ('gameID' in $$props) $$invalidate(1, gameID = $$props.gameID);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		activeItem,
    		gameID,
    		items,
    		handleTabChange,
    		resetActiveTab,
    		handleLinkClicked,
    		handleMouseOver
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
