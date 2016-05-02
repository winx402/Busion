package com.wang.cache.read;

import com.google.common.cache.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * Created BY wangwenxiang on 5/2/16.
 */
public abstract class AbstractMessageReadCache<K,V> {
    private Logger logger = LoggerFactory.getLogger(AbstractMessageReadCache.class);
    private final Cache<K, V> cache = CacheBuilder.newBuilder()
            .expireAfterAccess(30, TimeUnit.SECONDS)
            .removalListener(new RemovalListener<K, V>() {
                public void onRemoval(RemovalNotification<K, V> notification) {
                    removal(notification);
                }
            }).build();

    /**
     * 通过K获取V,如果V已经过期,则新建一个
     * @param k key
     * @return value
     */
    protected V getV(K k){
        V v = null;
        try {
            v = cache.get(k, new Callable<V>() {
                public V call() throws Exception {
                    return newInstanceV();
                }
            });
        } catch (ExecutionException e) {
            logger.error("getValue error : {}",k,e);
        }
        return v;
    }

    /**
     * 产生一个新的V实例
     * @return V
     */
    protected abstract V newInstanceV();

    /**
     * 手动清除一个K
     * @param k key
     */
    public void invalidate(K k){
        cache.invalidate(k);
    }

    /**
     * 清楚Key时同步执行的动作
     * @param notification 被清除的数据
     */
    protected abstract void removal(RemovalNotification<K, V> notification);

}
